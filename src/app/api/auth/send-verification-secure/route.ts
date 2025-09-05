import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { generateSecureAuthToken, isValidEmail, sanitizeEmail, sanitizeInput } from '@/lib/secure-auth-utils';
import { getVerificationEmailTemplate } from '@/lib/email-templates';
import { emailRateLimiter } from '@/lib/rate-limiter';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Request logging for security monitoring
function logSecurityEvent(event: string, details: any, request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  console.log(`[SECURITY] ${event}:`, {
    ip,
    userAgent,
    timestamp: new Date().toISOString(),
    ...details
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Rate limiting check
    const rateLimitResult = await emailRateLimiter.checkLimit(request);
    
    if (!rateLimitResult.allowed) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        retryAfter: rateLimitResult.retryAfter,
        endpoint: 'send-verification'
      }, request);
      
      return NextResponse.json(
        { 
          message: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '900',
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      logSecurityEvent('INVALID_JSON', { error: 'Malformed JSON' }, request);
      return NextResponse.json(
        { message: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { email, name } = body;

    // Enhanced input validation
    if (!email || typeof email !== 'string') {
      logSecurityEvent('MISSING_EMAIL', { email: email }, request);
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format with enhanced checks
    if (!isValidEmail(email)) {
      logSecurityEvent('INVALID_EMAIL_FORMAT', { email }, request);
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedName = name ? sanitizeInput(name, 50) : undefined;

    // Check for suspicious email patterns
    const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
    const emailDomain = sanitizedEmail.split('@')[1]?.toLowerCase();
    
    if (suspiciousDomains.some(domain => emailDomain?.includes(domain))) {
      logSecurityEvent('SUSPICIOUS_EMAIL_DOMAIN', { email: sanitizedEmail, domain: emailDomain }, request);
      // Don't block, but log for monitoring
    }

    if (!resend) {
      logSecurityEvent('SERVICE_UNAVAILABLE', { service: 'resend' }, request);
      return NextResponse.json(
        { message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Generate secure verification token
    const verificationToken = generateSecureAuthToken(sanitizedEmail, 'verification');
    
    // Create verification URL with HTTPS enforcement
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const isProduction = process.env.NODE_ENV === 'production';
    const secureUrl = isProduction ? baseUrl.replace('http://', 'https://') : baseUrl;
    const verificationUrl = `${secureUrl}/verify-email?token=${verificationToken}`;

    // Send verification email
    const { error } = await resend.emails.send({
      from: 'Ease Up <noreply@ease-up.app>',
      to: [sanitizedEmail],
      subject: 'Verify your email address - Ease Up',
      html: getVerificationEmailTemplate({
        name: sanitizedName || 'User',
        email: sanitizedEmail,
        verificationUrl,
        appName: 'Ease Up'
      }),
    });

    if (error) {
      logSecurityEvent('EMAIL_SEND_FAILED', { 
        error: error.message, 
        email: sanitizedEmail 
      }, request);
      
      return NextResponse.json(
        { message: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    // Log successful verification email
    logSecurityEvent('VERIFICATION_EMAIL_SENT', {
      email: sanitizedEmail,
      processingTime: Date.now() - startTime
    }, request);

    return NextResponse.json({ 
      message: 'Verification email sent successfully',
      email: sanitizedEmail 
    }, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
      }
    });

  } catch (error) {
    logSecurityEvent('INTERNAL_ERROR', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      processingTime: Date.now() - startTime
    }, request);
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
