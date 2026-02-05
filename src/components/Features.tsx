'use client';

import React from 'react';
import {
  EyeIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  ClockIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useAppStoreRating } from '../context/AppStoreContext';

const Features: React.FC = () => {
  const { shouldShow, formattedRating, formattedReviewCount } = useAppStoreRating();

  const features = [
    {
      icon: EyeIcon,
      title: 'Science-Based Eye Exercises',
      description: 'Personalized eye exercise programs based on scientifically-studied techniques to support your eye health.',
      color: 'blue'
    },
    {
      icon: ChartBarIcon,
      title: 'Vision Progress Tracking',
      description: 'Monitor your eye health with detailed analytics and visual acuity measurements.',
      color: 'green'
    },
    {
      icon: BellIcon,
      title: '20-20-20 Rule Notifications',
      description: 'Smart reminders every 20 minutes to protect your eyes from digital strain.',
      color: 'purple'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Eye Health Protection',
      description: 'Evidence-based techniques for safe, effective eye exercise routines.',
      color: 'red'
    },
    {
      icon: ClockIcon,
      title: 'Quick Eye Workouts',
      description: 'Efficient 3-10 minute daily sessions that fit into your busy schedule.',
      color: 'yellow'
    },
    {
      icon: CogIcon,
      title: 'Smart Vision AI',
      description: 'Algorithms that adapt your program based on progress and visual needs.',
      color: 'indigo'
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      red: 'text-red-600 bg-red-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      indigo: 'text-indigo-600 bg-indigo-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Build stats array dynamically based on whether rating should be shown
  const stats = shouldShow ? [
    {
      value: `${formattedRating}★`,
      label: 'App Rating',
      sublabel: `From ${formattedReviewCount} reviews`
    }
  ] : [];

  return (
    <section id="features" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - more compact */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Hawk AI?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced AI meets proven vision science for personalized eye care
            that strengthens your vision and protects your eye health.
          </p>
        </div>

        {/* Features Grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-4 sm:p-6 lg:p-8 text-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full mb-4 ${getIconColor(feature.color)} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              </div>

              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section - dynamic based on rating availability */}
        <div className="mt-12 md:mt-20 bg-gray-900 rounded-2xl p-6 md:p-8 lg:p-12">
          <div className={`grid grid-cols-1 ${stats.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 md:gap-8 text-center text-white`}>
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-200 text-sm sm:text-base">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
