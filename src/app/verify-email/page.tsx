'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        setEmail(data.email);
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  const handleContinue = () => {
    // Redirect to dashboard or main app
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
              className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
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
              Email Verification
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-3">
              Confirming your email address for secure access
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-left">
                  <p className="text-sm font-medium text-amber-800 mb-1">
                    Account Access Requires Verification
                  </p>
                  <p className="text-xs text-amber-700">
                    You cannot sign in or access your account until your email address is verified for security purposes.
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
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Verifying Your Email
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Please wait while we verify your email address and activate your account.
                  </p>
                  <div className="mt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                      <div className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
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
                      Email Verified Successfully! 🎉
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Your email address{' '}
                      <span className="font-medium text-gray-900">{email}</span>{' '}
                      has been verified and your account is now active.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 mt-0.5">✅</div>
                        <div className="text-left">
                          <p className="text-sm text-green-800 mb-1">
                            Welcome to Ease Up! Your email is now verified.
                          </p>
                          <p className="text-xs text-green-700">
                            You can now sign in and access all posture correction features and personalized exercise programs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                  >
                    Start Your Journey
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
                      Verification Failed
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {message}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/auth/login')}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
                    >
                      Request New Verification
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
                Verification links expire after 48 hours. If you&apos;re having trouble, check your spam folder or contact our support team.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Note:</strong> Account access is restricted until email verification is completed.
              </p>
              <Link
                href="mailto:support@ease-up.app"
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 underline"
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
