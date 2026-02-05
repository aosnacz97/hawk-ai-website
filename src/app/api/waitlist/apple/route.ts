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

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Insert into Apple waitlist
    const { error } = await supabase
      .from('apple_waitlist')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { success: false, message: 'This email is already on the waitlist!' },
          { status: 409 }
        );
      }
      // Log error internally but don't expose details to client
      return NextResponse.json(
        { success: false, message: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Successfully joined Apple waitlist!' });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
