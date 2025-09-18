'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';

function MagicLinkContent() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleAuthCallback = useCallback(async () => {
    try {
      // Check if Supabase is available
      if (!supabase) {
        setStatus('error');
        setMessage('Authentication service is not configured. Please contact support.');
        return;
      }

      // Get the session from the URL hash/fragment
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage(error.message || 'Authentication failed');
        return;
      }

      if (data.session) {
        setStatus('success');
        setMessage('Successfully signed in!');
        setEmail(data.session.user.email || '');
        
        // Store the session for the iOS app to pick up
        if (typeof window !== 'undefined') {
          localStorage.setItem('supabase_session', JSON.stringify(data.session));
        }
        
        // Redirect to app after a short delay
        setTimeout(() => {
          // Try to redirect to the iOS app using a custom URL scheme
          const appUrl = `easeup://auth/success?session=${encodeURIComponent(JSON.stringify(data.session))}`;
          window.location.href = appUrl;
          
          // Fallback: redirect to home page
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }, 2000);
      } else {
        setStatus('error');
        setMessage('No valid session found. The magic link may have expired.');
      }
    } catch (error) {
      console.error('Magic link verification error:', error);
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }, [router]);

  useEffect(() => {
    handleAuthCallback();
  }, [handleAuthCallback]);

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
                src="/hawkeye_logo.png"
                alt="Hawk AI Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-2xl"
              />
              <span className="text-xl font-bold text-gray-900">Hawk AI</span>
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
                src="/hawkeye_logo.png"
                alt="Hawk AI Logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-3xl shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Magic Link Sign In
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-3">
              Completing your secure sign-in process
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Secure Authentication
                  </p>
                  <p className="text-xs text-blue-700">
                    You&apos;re being signed in securely. This process is automatic and secure.
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
                    Signing You In
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Please wait while we complete your secure sign-in process.
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
                      Successfully Signed In! 🎉
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Welcome back! You&apos;re now signed in as{' '}
                      <span className="font-medium text-gray-900">{email}</span>
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 mt-0.5">✅</div>
                        <div className="text-left">
                          <p className="text-sm text-green-800 mb-1">
                            Redirecting to Hawk AI App
                          </p>
                          <p className="text-xs text-green-700">
                            You should be automatically redirected to the Hawk AI app. If not, tap the button below.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                  >
                    Open Hawk AI App
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
                      className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200"
                    >
                      Try Again
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
                Magic links expire after 1 hour. If you&apos;re having trouble, try requesting a new magic link.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Note:</strong> Make sure you have the Hawk AI app installed on your device.
              </p>
              <Link
                href="mailto:support@hawk-ai.xyz"
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 underline"
              >
                support@hawk-ai.xyz
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
