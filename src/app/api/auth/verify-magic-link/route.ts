import { NextRequest, NextResponse } from 'next/server';
import { isTokenValid } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // Validate required fields
    if (!token) {
      return NextResponse.json(
        { message: 'Magic link token is required' },
        { status: 400 }
      );
    }

    // Validate token
    const tokenValidation = isTokenValid(token);
    
    if (!tokenValidation.valid) {
      return NextResponse.json(
        { message: tokenValidation.error || 'Invalid or expired magic link' },
        { status: 400 }
      );
    }

    const { payload } = tokenValidation;
    
    // Ensure this is a magic link token
    if (payload?.type !== 'magic_link') {
      return NextResponse.json(
        { message: 'Invalid token type' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create or update user session
    // 3. Generate JWT or session token
    // 4. Log the login event
    
    // For now, we'll return success with user info
    return NextResponse.json({ 
      message: 'Magic link verified successfully',
      email: payload.email,
      authenticated: true,
      // In a real app, you'd return a session token here
      // sessionToken: generateSessionToken(payload.email)
    });

  } catch (error) {
    console.error('Verify magic link error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
