import React, { useState } from 'react';
import Link from 'next/link';
import { submitToAppleWaitlist } from '../api/waitlist';

const AppleWaitlist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitToAppleWaitlist(email);
      
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <img
              src="/ease_up_logo_transparent.png"
              alt="Ease Up Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">Ease Up</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/apple-waitlist" className="inline-block">
              <img
                src="/app_store_badge.png"
                alt="Download on the App Store"
                className="h-8 w-auto"
              />
            </a>
            <a href="/android-waitlist" className="inline-block">
              <img
                src="/play_store_badge.png"
                alt="Get it on Google Play"
                className="h-8 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img
                src="/ease_up_logo.png"
                alt="Ease Up Logo"
                className="h-12 w-12 rounded-2xl"
              />
              <span className="ml-3 text-2xl font-bold text-gray-900">Ease Up</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Coming Soon to iOS
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Ease Up is launching on iOS! Be the first to know when our AI-powered posture correction 
            and pain relief app becomes available on the App Store.
          </p>

          {/* App Store Badge */}
          <div className="text-center mb-8">
            <a href="#app-store" className="inline-block transition-transform hover:scale-105">
              <img
                src="/app_store_badge.png"
                alt="Download on the App Store"
                className="h-16 w-auto"
              />
            </a>
          </div>

          {/* Email Waitlist Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="text-center mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm text-center mb-4">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
              </button>
            </form>
          ) : (
            <div className="text-center mb-8">
              <div className="text-green-600 text-lg font-semibold mb-2">
                🎉 You&apos;re on the list!
              </div>
              <p className="text-gray-600">
                We&apos;ll notify you as soon as Ease Up launches on iOS.
              </p>
            </div>
          )}

          {/* What to Expect Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              What to Expect on iOS
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="text-green-500 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">AI-powered posture analysis and correction</span>
              </div>
              <div className="flex items-center">
                <div className="text-green-500 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Personalized exercise programs</span>
              </div>
              <div className="flex items-center">
                <div className="text-green-500 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Progress tracking and analytics</span>
              </div>
              <div className="flex items-center">
                <div className="text-green-500 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Optimized for iPhone and iPad</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleWaitlist;
