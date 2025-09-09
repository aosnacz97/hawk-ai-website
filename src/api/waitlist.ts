// Updated for security - all operations now server-side
export interface WaitlistSubmission {
  email: string;
}

export const submitToAndroidWaitlist = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/waitlist/android', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch {
    return { success: false, message: 'Failed to join waitlist. Please try again.' };
  }
};

export const submitToAppleWaitlist = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch('/api/waitlist/apple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch {
    return { success: false, message: 'Failed to join waitlist. Please try again.' };
  }
};
