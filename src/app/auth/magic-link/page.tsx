'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function MagicLinkContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check for both 'token' and 'code' parameters for compatibility
    const token = searchParams.get('token') || searchParams.get('code');

    // Debug logging for troubleshooting
    console.log('URL search params:', searchParams.toString());
    console.log('Token from URL:', token);
    console.log('Full URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');

    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    verifyMagicLink(token);
  }, [searchParams]);

  const verifyMagicLink = async (token: string) => {
    try {
      console.log('Attempting to verify magic link token:', token.substring(0, 20) + '...');
      
      // Always use Supabase magic link verification endpoint
      const endpoint = '/api/auth/verify-magic-link-supabase';
      const payload = { code: token };
      
      console.log('Using endpoint:', endpoint);
      console.log('Payload:', payload);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Magic link verification response:', { status: response.status, data });

      if (response.ok) {
        setStatus('success');
        setMessage('You have been signed in successfully!');
        setEmail(data.email);
      } else {
        setStatus('error');
        setMessage(data.message || 'Magic link verification failed');
      }
    } catch (error) {
      console.error('Magic link verification error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const handleContinue = () => {
    // Redirect to dashboard or main app
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/ease_up_logo.png"
                alt="Ease Up Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-2xl"
              />
              <span className="text-xl font-bold text-gray-900">Ease Up</span>
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-green-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/ease_up_logo.png"
                alt="Ease Up Logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-3xl shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Magic Link Sign In
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-3">
              Secure, password-free authentication
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-left">
                  <p className="text-sm font-medium text-green-800 mb-1">
                    Password-Free Security
                  </p>
                  <p className="text-xs text-green-700">
                    Magic links provide secure authentication without requiring you to remember passwords.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="p-8">
              {status === 'loading' && (
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Verifying Your Magic Link
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Please wait while we verify your magic link and sign you in.
                  </p>
                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                      <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {status === 'success' && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircleIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Welcome Back! 🎉
                    </h2>
                    <p className="text-gray-600 mb-4">
                      You have been successfully signed in as{' '}
                      <span className="font-medium text-gray-900">{email}</span>
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 mt-0.5">✅</div>
                        <div className="text-left">
                          <p className="text-sm text-green-800 mb-1">
                            Magic link authentication successful!
                          </p>
                          <p className="text-xs text-green-700">
                            You can now access all your posture correction features and personalized exercise programs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                  >
                    Continue to App
                  </button>
                </div>
              )}

              {status === 'error' && (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                      <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Sign In Failed
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {message}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/auth/login')}
                      className="w-full bg-green-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-green-700 transition-all duration-200"
                    >
                      Request New Magic Link
                    </button>
                    <button
                      onClick={() => router.push('/')}
                      className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200"
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">
                Magic links expire after 24 hours. If you&apos;re having trouble, check your spam folder or request a new magic link.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Note:</strong> Magic links are single-use and will expire after being used.
              </p>
              <Link
                href="mailto:support@ease-up.app"
                className="inline-flex items-center text-xs text-green-600 hover:text-green-700 underline"
              >
                support@ease-up.app
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MagicLinkPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <MagicLinkContent />
    </Suspense>
  );
}