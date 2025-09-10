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
    const { code, type = 'email' } = await request.json();
    
    // Debug logging
    console.log('Supabase verify email request received');
    console.log('Code:', code);
    console.log('Type:', type);

    // Validate required fields
    if (!code) {
      console.log('No code provided');
      return NextResponse.json(
        { message: 'Verification code is required' },
        { status: 400 }
      );
    }

    // Verify the email using Supabase
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: code,
      type: 'email'
    });

    if (error) {
      console.log('Supabase verification failed:', error.message);
      return NextResponse.json(
        { message: error.message || 'Verification failed' },
        { status: 400 }
      );
    }

    console.log('Supabase verification successful:', data);

    return NextResponse.json({ 
      message: 'Email verified successfully',
      email: data.user?.email,
      verified: true,
      user: data.user
    });

  } catch (error) {
    console.error('Supabase verify email error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
