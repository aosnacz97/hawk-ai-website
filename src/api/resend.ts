// import { Resend } from 'resend';

// Initialize Resend client with proper environment variable handling
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('Missing Resend API key. Please check your .env file.');
}

// Note: Resend client is not used in this file anymore since we moved to API endpoint
// const resend = new Resend(resendApiKey || 'placeholder-key');

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData): Promise<{ success: boolean; message?: string }> => {
  // Check if Resend API key is properly set
  if (!resendApiKey) {
    return { 
      success: false, 
      message: 'Email service is not configured. Please check your environment variables.' 
    };
  }

  try {
    // For now, let's use a simple approach that doesn't require backend
    // We'll redirect to a mailto link as a fallback
    const mailtoLink = `mailto:support@ease-up.app?subject=${encodeURIComponent(`Contact Form: ${data.subject}`)}&body=${encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent from Ease Up website contact form
    `)}`;
    
    window.open(mailtoLink, '_blank');
    
    return { 
      success: true, 
      message: 'Email client opened. Please send the email manually.' 
    };
    
    // Note: The original Resend approach would work with a proper backend API
    // For now, this provides a working fallback solution
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      message: 'Failed to open email client. Please email us directly at support@ease-up.app' 
    };
  }
};
