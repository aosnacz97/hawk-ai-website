'use client';

import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAppStoreRating } from '../context/AppStoreContext';

const Testimonials: React.FC = () => {
  const { shouldShow, formattedRating, formattedReviewCount } = useAppStoreRating();

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Graphic Designer',
      content: 'I love how Hawk AI reminds me to take breaks during long design sessions. The 20-20-20 reminders help me maintain better habits throughout my workday.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Mike R.',
      role: 'Software Developer',
      content: 'The personalized eye exercise program fits perfectly into my coding breaks. I appreciate how the app adapts to my schedule and screen time patterns.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Jennifer L.',
      role: 'Vision Therapist',
      content: 'As a vision therapist, I appreciate apps that follow evidence-based approaches. Hawk AI uses scientifically-grounded exercises and the progress tracking is helpful.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'David K.',
      role: 'Truck Driver',
      content: 'Hawk AI helped me understand proper eye care and build better habits. The exercises are quick enough to do during rest stops on long drives.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Emma T.',
      role: 'Student',
      content: 'Perfect for students! Quick eye exercises between study sessions, and the app reminds me to take vision breaks. It helps me maintain better study habits.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Robert P.',
      role: 'Retired',
      content: 'The gentle eye exercises in Hawk AI are perfect for my age. I appreciate having a structured routine to support my eye health as I get older.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    }
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from people who use Hawk AI as part of their daily eye health routine.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card p-4 sm:p-6 group hover:shadow-2xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex text-yellow-400 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed line-clamp-4">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating - only show if rating meets criteria */}
        <div className="mt-10 md:mt-16 text-center">
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 lg:p-12">
            {shouldShow ? (
              <>
                <div className="flex justify-center items-center mb-4">
                  <div className="flex text-yellow-400 mr-3 sm:mr-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                    ))}
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">{formattedRating}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Excellent App Rating
                </h3>
                <p className="text-base sm:text-lg text-gray-300 mb-6">
                  Based on {formattedReviewCount} reviews on the App Store
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Join Our Community
                </h3>
                <p className="text-base sm:text-lg text-gray-300 mb-6">
                  Be among the first to improve your vision with Hawk AI
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/apple-waitlist"
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  width={180}
                  height={60}
                  className="h-10 sm:h-12 w-auto mx-auto"
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
                  className="h-10 sm:h-12 w-auto mx-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
