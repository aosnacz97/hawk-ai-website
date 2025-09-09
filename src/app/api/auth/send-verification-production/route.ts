import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { generateSecureAuthToken, isValidEmail, sanitizeEmail, sanitizeInput } from '@/lib/secure-auth-utils';
import { getVerificationEmailTemplate } from '@/lib/email-templates';
import { enterpriseEmailRateLimiter, globalRateLimiter } from '@/lib/enterprise-rate-limiter';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Enhanced logging for production monitoring
function logSecurityEvent(event: string, details: Record<string, unknown>, request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const tier = request.headers.get('x-premium-user') === 'true' ? 'premium' : 'standard';
  
  // In production, send to your logging service (e.g., DataDog, New Relic, etc.)
  console.log(`[SECURITY] ${event}:`, {
    ip,
    userAgent,
    tier,
    timestamp: new Date().toISOString(),
    ...details
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Global rate limiting check (protects against DDoS)
    const globalRateLimitResult = await globalRateLimiter.checkLimit(request);
    
    if (!globalRateLimitResult.allowed) {
      logSecurityEvent('GLOBAL_RATE_LIMIT_EXCEEDED', {
        retryAfter: globalRateLimitResult.retryAfter,
        endpoint: 'send-verification'
      }, request);
      
      return NextResponse.json(
        { 
          message: 'Service temporarily unavailable. Please try again later.',
          retryAfter: globalRateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': globalRateLimitResult.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': '1000',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': globalRateLimitResult.resetTime.toString()
          }
        }
      );
    }

    // Email-specific rate limiting check
    const emailRateLimitResult = await enterpriseEmailRateLimiter.checkLimit(request);
    
    if (!emailRateLimitResult.allowed) {
      logSecurityEvent('EMAIL_RATE_LIMIT_EXCEEDED', {
        retryAfter: emailRateLimitResult.retryAfter,
        tier: emailRateLimitResult.tier,
        endpoint: 'send-verification'
      }, request);
      
      return NextResponse.json(
        { 
          message: 'Too many verification emails sent. Please try again later.',
          retryAfter: emailRateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': emailRateLimitResult.retryAfter?.toString() || '300',
            'X-RateLimit-Limit': '32767',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': emailRateLimitResult.resetTime.toString(),
            'X-User-Tier': emailRateLimitResult.tier || 'standard'
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
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

    // Check for suspicious email patterns (but don't block, just log)
    const suspiciousDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
    const emailDomain = sanitizedEmail.split('@')[1]?.toLowerCase();
    
    if (suspiciousDomains.some(domain => emailDomain?.includes(domain))) {
      logSecurityEvent('SUSPICIOUS_EMAIL_DOMAIN', { 
        email: sanitizedEmail, 
        domain: emailDomain,
        tier: emailRateLimitResult.tier 
      }, request);
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
        email: sanitizedEmail,
        tier: emailRateLimitResult.tier
      }, request);
      
      return NextResponse.json(
        { message: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    // Log successful verification email
    logSecurityEvent('VERIFICATION_EMAIL_SENT', {
      email: sanitizedEmail,
      tier: emailRateLimitResult.tier,
      processingTime: Date.now() - startTime,
      burstUsed: emailRateLimitResult.burstAllowed
    }, request);

    return NextResponse.json({ 
      message: 'Verification email sent successfully',
      email: sanitizedEmail 
    }, {
      headers: {
        'X-RateLimit-Limit': '32767',
        'X-RateLimit-Remaining': emailRateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': emailRateLimitResult.resetTime.toString(),
        'X-User-Tier': emailRateLimitResult.tier || 'standard',
        'X-Processing-Time': (Date.now() - startTime).toString()
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
