'use client';

import React from 'react';
import Image from 'next/image';
import { useAppStoreRating } from '../context/AppStoreContext';

const Hero: React.FC = () => {
  const { shouldShow, formattedRating, formattedReviewCount, rating } = useAppStoreRating();

  // Calculate filled stars for visual display
  const filledStars = rating ? Math.round(rating) : 0;

  return (
    <section id="home" className="pt-20 sm:pt-24 min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        {/* Mobile Layout - Centered */}
        <div className="w-full lg:hidden py-8 text-center">
          {/* App Icon in Card */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-lg w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <Image
                src="/hawkeye_logo.png"
                alt="Hawk AI"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            AI-Powered Eye Exercises & Vision Training
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
            Hawk AI provides science-based eye exercises and smart 20-20-20 reminders.
            Train your visual system and{' '}
            <span className="font-semibold text-gray-900">support your eye health</span>{' '}
            in just minutes a day.
          </p>

          {/* App Store Badges */}
          <div className="flex flex-row gap-3 sm:gap-4 mb-6 items-center justify-center">
            <a
              href="/apple-waitlist"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/app_store_badge.png"
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-11 sm:h-14 w-auto"
              />
            </a>
            <a
              href="/android-waitlist"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/play_store_badge.png"
                alt="Get it on Google Play"
                width={180}
                height={60}
                className="h-11 sm:h-14 w-auto"
              />
            </a>
          </div>

          {/* Rating or Trust Text */}
          {shouldShow ? (
            <div className="inline-flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-100 px-6 py-4 mt-2">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 mr-2">{formattedRating}</span>
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${i < filledStars ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm sm:text-base text-gray-500">{formattedReviewCount} Reviews</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              Free to download • Science-based exercises
            </p>
          )}
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:flex w-full items-center justify-between py-12 gap-12 xl:gap-20">
          {/* Left Column - Content */}
          <div className="flex-1 max-w-2xl">
            {/* Headline */}
            <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              AI-Powered Eye Exercises & Vision Training
            </h1>

            {/* Description */}
            <p className="text-lg xl:text-xl text-gray-600 mb-8 leading-relaxed">
              Hawk AI provides science-based eye exercises and smart 20-20-20 reminders.
              Train your visual system and{' '}
              <span className="font-semibold text-gray-900">support your eye health</span>{' '}
              in just minutes a day.
            </p>

            {/* App Store Badges and Rating Row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/apple-waitlist"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  width={160}
                  height={53}
                  className="h-12 w-auto"
                />
              </a>
              <a
                href="/android-waitlist"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/play_store_badge.png"
                  alt="Get it on Google Play"
                  width={160}
                  height={53}
                  className="h-12 w-auto"
                />
              </a>

              {/* Rating Card - inline on desktop */}
              {shouldShow && (
                <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-3 ml-2">
                  <span className="text-2xl font-bold text-gray-900 mr-2">{formattedRating}</span>
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < filledStars ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{formattedReviewCount} Reviews</span>
                </div>
              )}
            </div>

            {/* Trust Text - only show if no rating */}
            {!shouldShow && (
              <p className="text-sm text-gray-500 mt-4">
                Free to download • Science-based exercises
              </p>
            )}
          </div>

          {/* Right Column - Logo */}
          <div className="flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-2xl w-72 h-72 xl:w-80 xl:h-80 flex items-center justify-center">
              <Image
                src="/hawkeye_logo.png"
                alt="Hawk AI"
                width={200}
                height={200}
                className="w-48 h-48 xl:w-56 xl:h-56 rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
