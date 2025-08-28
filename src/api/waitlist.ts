import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback handling
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? '✅ Set' : '❌ Missing',
    key: supabaseAnonKey ? '✅ Set' : '❌ Missing'
  });
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export interface WaitlistSubmission {
  email: string;
}

export const submitToAndroidWaitlist = async (email: string): Promise<{ success: boolean; message?: string }> => {
  // Check if environment variables are properly set
  if (!supabaseUrl || !supabaseAnonKey) {
    return { 
      success: false, 
      message: 'Supabase configuration is missing. Please check your environment variables.' 
    };
  }

  try {
    const { error } = await supabase
      .from('android_waitlist')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, message: 'This email is already on the waitlist!' };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting to Android waitlist:', error);
    return { success: false, message: 'Failed to join waitlist. Please try again.' };
  }
};

export const submitToAppleWaitlist = async (email: string): Promise<{ success: boolean; message?: string }> => {
  // Check if environment variables are properly set
  if (!supabaseUrl || !supabaseAnonKey) {
    return { 
      success: false, 
      message: 'Supabase configuration is missing. Please check your environment variables.' 
    };
  }

  try {
    const { error } = await supabase
      .from('apple_waitlist')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, message: 'This email is already on the waitlist!' };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting to Apple waitlist:', error);
    return { success: false, message: 'Failed to join waitlist. Please try again.' };
  }
};
