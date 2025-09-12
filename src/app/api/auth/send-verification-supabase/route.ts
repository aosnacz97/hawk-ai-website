import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for server-side operations');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Debug logging
    console.log('Supabase send verification request received');
    console.log('Email:', email);

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send verification email using Supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.ease-up.app'}/auth/verify`
      }
    });

    if (error) {
      console.log('Supabase send verification failed:', error.message);
      return NextResponse.json(
        { message: error.message || 'Failed to send verification email' },
        { status: 500 }
      );
    }

    console.log('Supabase verification email sent successfully:', data);

    return NextResponse.json({ 
      message: 'Verification email sent successfully',
      email: email
    });

  } catch (error) {
    console.error('Supabase send verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
