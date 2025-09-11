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
    console.log('Supabase verify magic link request received');
    console.log('Code:', code);
    console.log('Type:', type);
    console.log('Code length:', code?.length);
    console.log('Code format (UUID):', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(code || ''));

    // Validate required fields
    if (!code) {
      console.log('No code provided');
      return NextResponse.json(
        { message: 'Verification code is required' },
        { status: 400 }
      );
    }

    // Verify the magic link using Supabase
    const { data, error } = await supabase.auth.verifyOtp({
      token: code,
      type: 'email'
    });

    if (error) {
      console.log('Supabase magic link verification failed:', error.message);
      console.log('Error details:', error);
      return NextResponse.json(
        { message: error.message || 'Magic link is invalid or has expired' },
        { status: 400 }
      );
    }

    console.log('Supabase magic link verification successful:', data);

    return NextResponse.json({ 
      message: 'Magic link verified successfully',
      email: data.user?.email,
      verified: true,
      user: data.user
    });

  } catch (error) {
    console.error('Supabase verify magic link error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
