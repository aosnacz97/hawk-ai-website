'use client';

import { useState } from 'react';
import EmailVerification from './EmailVerification';
import MagicLinkLogin from './MagicLinkLogin';
import { EnvelopeIcon, KeyIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AuthIntegrationProps {
  onAuthSuccess?: (email: string, type: 'verification' | 'login') => void;
  onClose?: () => void;
  defaultMode?: 'verify' | 'login';
}

export default function AuthIntegration({ 
  onAuthSuccess, 
  onClose, 
  defaultMode = 'verify' 
}: AuthIntegrationProps) {
  const [activeMode, setActiveMode] = useState<'verify' | 'login'>(defaultMode);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSuccess = (email: string) => {
    if (onAuthSuccess) {
      onAuthSuccess(email, activeMode === 'verify' ? 'verification' : 'login');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeMode === 'verify' ? 'Email Verification' : 'Sign In'}
          </h2>
          {onClose && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Mode Toggle */}
        <div className="p-6 border-b">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveMode('verify')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeMode === 'verify'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <EnvelopeIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Verify Email</span>
            </button>
            <button
              onClick={() => setActiveMode('login')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                activeMode === 'login'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <KeyIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Magic Link</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeMode === 'verify' ? (
            <EmailVerification onVerificationComplete={handleSuccess} />
          ) : (
            <MagicLinkLogin onLoginSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}

// Example usage in your existing components:
export function ExampleUsage() {
  const [showAuth, setShowAuth] = useState(false);

  const handleAuthSuccess = (email: string, type: 'verification' | 'login') => {
    console.log(`${type} successful for:`, email);
    // Handle successful authentication
    setShowAuth(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowAuth(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Open Auth Modal
      </button>

      {showAuth && (
        <AuthIntegration
          onAuthSuccess={handleAuthSuccess}
          onClose={() => setShowAuth(false)}
          defaultMode="verify"
        />
      )}
    </div>
  );
}
