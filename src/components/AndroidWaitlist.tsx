'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { submitToAndroidWaitlist } from '../api/waitlist';

const AndroidWaitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitToAndroidWaitlist(email);

      if (result.success) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 py-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/hawkeye_logo_transparent.png"
              alt="Hawk AI Logo"
              width={32}
              height={32}
              className="h-7 w-7 sm:h-8 sm:w-8"
            />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">Hawk AI</span>
          </Link>
          <a href="/apple-waitlist" className="inline-block">
            <Image
              src="/app_store_badge.png"
              alt="Download on the App Store"
              width={100}
              height={33}
              className="h-7 sm:h-8 w-auto"
            />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <Image
                  src="/hawkeye_logo.png"
                  alt="Hawk AI Logo"
                  width={44}
                  height={44}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl"
                />
                <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-900">Hawk AI</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
              Coming Soon to Android
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6 leading-relaxed">
              Be the first to know when our AI-powered eye health and exercise app
              launches on Google Play.
            </p>

            {/* Google Play Badge */}
            <div className="text-center mb-6">
              <Image
                src="/play_store_badge.png"
                alt="Coming to Google Play"
                width={180}
                height={54}
                className="h-12 sm:h-14 w-auto mx-auto opacity-75"
              />
            </div>

            {/* Email Waitlist Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-xs sm:text-sm text-center mb-4">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>
            ) : (
              <div className="text-center mb-6 p-4 bg-green-50 rounded-lg">
                <div className="text-green-600 text-base sm:text-lg font-semibold mb-1">
                  You&apos;re on the list!
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  We&apos;ll notify you when Hawk AI launches on Android.
                </p>
              </div>
            )}

            {/* What to Expect Section */}
            <div className="mb-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 text-center">
                What to Expect on Android
              </h2>
              <div className="space-y-2">
                {[
                  'AI-powered vision analysis and exercises',
                  'Personalized eye exercise programs',
                  'Smart 20-20-20 rule notifications',
                  'Same powerful features as iOS'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-green-500 mr-2 flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link
                href="/"
                className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AndroidWaitlist;
