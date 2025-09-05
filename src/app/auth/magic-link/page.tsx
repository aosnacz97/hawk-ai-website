'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function MagicLinkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('No magic link token provided');
      return;
    }

    verifyMagicLink(token);
  }, [searchParams]);

  const verifyMagicLink = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You have been successfully signed in!');
        setEmail(data.email);
        
        // Here you would typically:
        // 1. Store the session token in localStorage/cookies
        // 2. Update your app's authentication state
        // 3. Redirect to the dashboard
        
        // For now, we'll just show success and redirect after a delay
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Magic link verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const handleContinue = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Magic Link Sign In</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Signing you in...</h2>
              <p className="text-gray-600">Please wait while we verify your magic link.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back!</h2>
              <p className="text-gray-600 mb-4">
                You have been successfully signed in as <strong>{email}</strong>.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Redirecting you to the app...
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue to App
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Go to Homepage
                </button>
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Request New Magic Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
