'use client';

import { useState } from 'react';
import EmailVerification from '@/components/EmailVerification';

export default function VerifyPage() {
  const [showVerification, setShowVerification] = useState(true);

  const handleVerificationComplete = (email: string) => {
    console.log('Verification email sent to:', email);
    // You can add additional logic here, like tracking analytics
  };

  const handleClose = () => {
    setShowVerification(false);
    // Redirect to home or dashboard
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {showVerification && (
        <EmailVerification 
          onVerificationComplete={handleVerificationComplete}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
