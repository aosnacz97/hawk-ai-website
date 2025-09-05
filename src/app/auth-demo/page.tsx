'use client';

import { useState } from 'react';
import EmailVerification from '@/components/EmailVerification';
import MagicLinkLogin from '@/components/MagicLinkLogin';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function AuthDemoPage() {
  const [activeTab, setActiveTab] = useState<'verify' | 'login'>('verify');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Authentication Demo
          </h1>
          <p className="text-lg text-gray-600">
            Test email verification and magic link authentication powered by Resend
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('verify')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors ${
                activeTab === 'verify'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>Email Verification</span>
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors ${
                activeTab === 'login'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <KeyIcon className="h-5 w-5" />
              <span>Magic Link Login</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {activeTab === 'verify' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Verification
                </h2>
                <p className="text-gray-600">
                  Send a verification email to confirm a user's email address
                </p>
              </div>
              <EmailVerification />
            </div>
          )}

          {activeTab === 'login' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Magic Link Login
                </h2>
                <p className="text-gray-600">
                  Send a secure login link that doesn't require a password
                </p>
              </div>
              <MagicLinkLogin />
            </div>
          )}
        </div>

        {/* Features Overview */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <EnvelopeIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Email Verification</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Secure token-based verification</li>
              <li>• 48-hour expiration for security</li>
              <li>• Beautiful HTML email templates</li>
              <li>• Automatic success confirmation</li>
              <li>• Mobile-responsive design</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <KeyIcon className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Magic Link Login</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Passwordless authentication</li>
              <li>• 24-hour expiration for security</li>
              <li>• One-time use tokens</li>
              <li>• Secure email delivery</li>
              <li>• Seamless user experience</li>
            </ul>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Endpoints</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Email Verification</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded font-mono">
                  POST /api/auth/send-verification
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono">
                  POST /api/auth/verify-email
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Magic Link</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-100 p-2 rounded font-mono">
                  POST /api/auth/send-magic-link
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono">
                  POST /api/auth/verify-magic-link
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
