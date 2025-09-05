'use client';

import { useState } from 'react';
import MagicLinkLogin from '@/components/MagicLinkLogin';

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = (email: string) => {
    console.log('Magic link sent to:', email);
    // You can add additional logic here, like tracking analytics
  };

  const handleClose = () => {
    setShowLogin(false);
    // Redirect to home or dashboard
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {showLogin && (
        <MagicLinkLogin 
          onLoginSuccess={handleLoginSuccess}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
