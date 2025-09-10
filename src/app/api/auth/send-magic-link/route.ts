import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { generateAuthToken, isValidEmail, sanitizeEmail } from '@/lib/auth-utils';
import { getMagicLinkEmailTemplate } from '@/lib/email-templates';

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
    
    // Generate magic link token
    const magicLinkToken = generateAuthToken(sanitizedEmail, 'magic_link');
    
    // Create magic link URL with dynamic host detection
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const magicLinkUrl = `${baseUrl}/auth/magic-link?token=${magicLinkToken}`;

    // Send magic link email
    const { error } = await resend.emails.send({
      from: 'Ease Up <noreply@ease-up.app>',
      to: [sanitizedEmail],
      subject: 'Your Ease Up login link',
      html: getMagicLinkEmailTemplate({
        name: name || 'User',
        email: sanitizedEmail,
        magicLinkUrl,
        appName: 'Ease Up'
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { message: 'Failed to send magic link' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Magic link sent successfully',
      email: sanitizedEmail 
    });

  } catch (error) {
    console.error('Send magic link error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
