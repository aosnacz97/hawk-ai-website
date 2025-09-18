import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { generateAuthToken, isValidEmail, sanitizeEmail } from '@/lib/auth-utils';
import { getVerificationEmailTemplate } from '@/lib/email-templates';

// DEPRECATED: This endpoint is deprecated. Use /api/auth/send-verification-supabase instead.
// This endpoint will be removed in a future version.

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const sanitizedEmail = sanitizeEmail(email);
    
    // Generate verification token
    const verificationToken = generateAuthToken(sanitizedEmail, 'verification');
    
    // Create verification URL with dynamic host detection
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

    // Send verification email
    const { error } = await resend.emails.send({
      from: 'Hawk AI <noreply@hawkai.app>',
      to: [sanitizedEmail],
      subject: 'Verify your email address - Hawk AI',
      html: getVerificationEmailTemplate({
        name: name || 'User',
        email: sanitizedEmail,
        verificationUrl,
        appName: 'Hawk AI'
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Verification email sent successfully',
      email: sanitizedEmail 
    });

  } catch (error) {
    console.error('Send verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
