import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables for server-side operations');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { email } = await request.json();
    
    // Debug logging
    console.log('Supabase send magic link request received');
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

    // Send magic link using Supabase
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.hawk-ai.xyz'}/auth/magic-link`
      }
    });

    if (error) {
      console.log('Supabase send magic link failed:', error.message);
      return NextResponse.json(
        { message: error.message || 'Failed to send magic link' },
        { status: 500 }
      );
    }

    console.log('Supabase magic link sent successfully:', data);

    return NextResponse.json({ 
      message: 'Magic link sent successfully',
      email: email
    });

  } catch (error) {
    console.error('Supabase send magic link error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
