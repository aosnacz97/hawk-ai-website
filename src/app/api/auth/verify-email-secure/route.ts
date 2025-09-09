import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { decodeSecureToken, blacklistToken } from '@/lib/secure-auth-utils';
import { getVerificationSuccessEmailTemplate } from '@/lib/email-templates';
import { verificationRateLimiter } from '@/lib/rate-limiter';

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
    const rateLimitResult = await verificationRateLimiter.checkLimit(request);
    
    if (!rateLimitResult.allowed) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        retryAfter: rateLimitResult.retryAfter,
        endpoint: 'verify-email'
      }, request);
      
      return NextResponse.json(
        { 
          message: 'Too many verification attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '300',
            'X-RateLimit-Limit': '10000',
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

    const { token } = body;

    // Validate required fields
    if (!token || typeof token !== 'string') {
      logSecurityEvent('MISSING_TOKEN', { token: token }, request);
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Validate token length (basic sanity check)
    if (token.length < 50 || token.length > 1000) {
      logSecurityEvent('INVALID_TOKEN_LENGTH', { tokenLength: token.length }, request);
      return NextResponse.json(
        { message: 'Invalid token format' },
        { status: 400 }
      );
    }

    // Decode and validate token
    const tokenValidation = decodeSecureToken(token);
    
    if (!tokenValidation.valid) {
      logSecurityEvent('TOKEN_VALIDATION_FAILED', {
        reason: tokenValidation.reason,
        error: tokenValidation.error
      }, request);
      
      return NextResponse.json(
        { message: tokenValidation.error || 'Invalid verification token' },
        { status: 400 }
      );
    }

    const { payload } = tokenValidation;
    
    // Ensure this is a verification token
    if (payload?.type !== 'verification') {
      logSecurityEvent('INVALID_TOKEN_TYPE', {
        expectedType: 'verification',
        actualType: payload?.type
      }, request);
      
      return NextResponse.json(
        { message: 'Invalid token type' },
        { status: 400 }
      );
    }

    // Blacklist the token to prevent reuse
    blacklistToken(token);

    // Here you would typically:
    // 1. Update user's email verification status in your database
    // 2. Create a user session
    // 3. Log the verification event
    // 4. Check if this is a duplicate verification attempt
    
    // For now, we'll just send a success email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Ease Up <noreply@ease-up.app>',
          to: [payload.email],
          subject: 'Email verified successfully - Ease Up',
          html: getVerificationSuccessEmailTemplate({
            name: 'User',
            email: payload.email,
            appName: 'Ease Up'
          }),
        });
      } catch (emailError) {
        logSecurityEvent('SUCCESS_EMAIL_FAILED', {
          email: payload.email,
          error: emailError instanceof Error ? emailError.message : 'Unknown error'
        }, request);
        // Don't fail the verification if email sending fails
      }
    }

    // Log successful verification
    logSecurityEvent('EMAIL_VERIFIED', {
      email: payload.email,
      processingTime: Date.now() - startTime,
      tokenAge: Date.now() - payload.issuedAt
    }, request);

    return NextResponse.json({ 
      message: 'Email verified successfully',
      email: payload.email,
      verified: true
    }, {
      headers: {
        'X-RateLimit-Limit': '10000',
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
