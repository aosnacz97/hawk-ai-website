'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
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

  const verifyMagicLink = useCallback(async (token: string) => {
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
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }, [router]);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('No magic link token provided');
      return;
    }

    verifyMagicLink(token);
  }, [searchParams, verifyMagicLink]);

  const handleContinue = () => {
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
              Secure Sign In
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Verifying your magic link for seamless access
            </p>
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
                    Verifying Your Link
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Please wait while we securely sign you in to your Ease Up account.
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
                      Welcome Back!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      You have been successfully signed in as{' '}
                      <span className="font-medium text-gray-900">{email}</span>
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-green-800">
                        🎉 Your session has been securely established. Redirecting you to your dashboard...
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                  >
                    Continue to Dashboard
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

          {/* Security Info */}
          <div className="mt-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="ml-2 text-sm text-gray-600 font-medium">Secure Connection</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your magic link is processed securely with end-to-end encryption.
                Links expire after 24 hours for your safety.
              </p>
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
