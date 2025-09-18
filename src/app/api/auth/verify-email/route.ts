import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { isTokenValid } from '@/lib/auth-utils';
import { getVerificationSuccessEmailTemplate } from '@/lib/email-templates';

// DEPRECATED: This endpoint is deprecated. Use /api/auth/verify-email-supabase instead.
// This endpoint will be removed in a future version.

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    // Debug logging
    console.log('Verify email request received');
    console.log('Token length:', token ? token.length : 'undefined');
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'undefined');

    // Validate required fields
    if (!token) {
      console.log('No token provided');
      return NextResponse.json(
        { message: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Validate token
    const tokenValidation = isTokenValid(token);
    console.log('Token validation result:', tokenValidation);
    
    if (!tokenValidation.valid) {
      console.log('Token validation failed:', tokenValidation.error);
      return NextResponse.json(
        { message: tokenValidation.error || 'Invalid verification token' },
        { status: 400 }
      );
    }

    const { payload } = tokenValidation;
    
    // Ensure this is a verification token
    if (payload?.type !== 'verification') {
      return NextResponse.json(
        { message: 'Invalid token type' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Update user's email verification status in your database
    // 2. Create a user session
    // 3. Log the verification event
    
    // For now, we'll just send a success email
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Hawk AI <noreply@hawk-ai.xyz>',
          to: [payload.email],
          subject: 'Email verified successfully - Hawk AI',
          html: getVerificationSuccessEmailTemplate({
            name: 'User',
            email: payload.email,
            appName: 'Hawk AI'
          }),
        });
      } catch (emailError) {
        console.error('Failed to send success email:', emailError);
        // Don't fail the verification if email sending fails
      }
    }

    return NextResponse.json({ 
      message: 'Email verified successfully',
      email: payload.email,
      verified: true
    });

  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
