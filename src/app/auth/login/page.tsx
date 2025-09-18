'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MagicLinkLogin from '@/components/MagicLinkLogin';
import EmailVerification from '@/components/EmailVerification';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'verify'>('login');

  const handleLoginSuccess = (email: string) => {
    console.log('Magic link sent to:', email);
    // You can add additional logic here, like tracking analytics
  };

  const handleVerificationComplete = (email: string) => {
    console.log('Verification email sent to:', email);
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
              href="/"
              className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              ← Back to Home
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
              Welcome to Hawk AI
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Your journey to better posture and pain relief starts here
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Secure Account Access
                  </p>
                  <p className="text-xs text-blue-700">
                    Email verification is required before you can sign in and access your personalized posture correction program.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-1 mb-8">
            <div className="flex">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('verify')}
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  activeTab === 'verify'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Verify Email
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'login' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                <div className="p-8">
                  <MagicLinkLogin
                    onLoginSuccess={handleLoginSuccess}
                  />
                </div>
              </div>
            )}

            {activeTab === 'verify' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                <div className="p-8">
                  <EmailVerification
                    onVerificationComplete={handleVerificationComplete}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">
              By continuing, you agree to our{' '}
              <Link href="https://app.termly.io/policy-viewer/policy.html?policyUUID=cb723aeb-378d-4323-8a45-ce047a08f0e7" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="https://app.termly.io/policy-viewer/policy.html?policyUUID=cc219bc3-a2ff-42c3-88df-2e01c4010ade" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/apple-waitlist" className="transition-transform hover:scale-105">
                <Image
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </Link>
              <Link href="/android-waitlist" className="transition-transform hover:scale-105">
                <Image
                  src="/play_store_badge.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
