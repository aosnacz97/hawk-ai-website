'use client';

import React from 'react';
import Image from 'next/image';
import {
  DevicePhoneMobileIcon,
  EyeIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: DevicePhoneMobileIcon,
      title: 'Download Hawk AI',
      description: 'Install from the App Store or Google Play',
      color: 'blue'
    },
    {
      number: '2',
      icon: EyeIcon,
      title: 'Vision Assessment',
      description: 'Quick assessment to personalize your program',
      color: 'green'
    },
    {
      number: '3',
      icon: BellIcon,
      title: 'Smart Notifications',
      description: '20-20-20 reminders and exercise program',
      color: 'purple'
    },
    {
      number: '4',
      icon: ChartBarIcon,
      title: 'Track Progress',
      description: 'Monitor your eye exercise progress',
      color: 'orange'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How Hawk AI Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Improve your vision in 4 simple steps with our AI-powered system.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 sm:mb-6">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 sm:border-4 border-gray-200 text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 mb-2 sm:mb-4 group-hover:border-blue-500 transition-colors duration-300">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ${getIconColor(step.color)} group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-20 text-center">
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Improve Your Vision?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 max-w-xl mx-auto">
              Start your personalized eye exercise program today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
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

            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              Free to download • Science-based exercises
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
