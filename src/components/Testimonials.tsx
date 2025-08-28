import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Office Worker',
      content: 'Ease Up completely transformed my posture! After 8 hours at a desk, I used to have terrible back pain. Now I feel so much better and more confident.',
      rating: 5,
      avatar: '/ease_up_logo_transparent.png'
    },
    {
      name: 'Mike R.',
      role: 'Software Developer',
      content: 'The personalized program is incredible. The AI really understands my specific posture issues and the exercises are perfect for my schedule. Pain reduced by 90% in just 3 weeks!',
      rating: 5,
      avatar: '/ease_up_logo_transparent.png'
    },
    {
      name: 'Jennifer L.',
      role: 'Yoga Instructor',
      content: 'As a yoga instructor, I\'m very particular about posture apps. Ease Up is the real deal - professional, effective, and the progress tracking keeps me motivated.',
      rating: 5,
      avatar: '/ease_up_logo_transparent.png'
    },
    {
      name: 'David K.',
      role: 'Construction Worker',
      content: 'After years of back pain from heavy lifting, Ease Up helped me understand proper posture and gave me exercises I can do anywhere. Life changing!',
      rating: 5,
      avatar: '/ease_up_logo_transparent.png'
    },
    {
      name: 'Emma T.',
      role: 'Student',
      content: 'Perfect for students! Quick sessions between classes, and the app reminds me to check my posture. My neck pain is gone and I feel so much more energetic.',
      rating: 5,
      avatar: '/ease_up_logo_transparent.png'
    },
    {
      name: 'Robert P.',
      role: 'Retired',
      content: 'At 65, I thought it was too late to fix my posture. Ease Up proved me wrong! The gentle exercises are perfect for my age and the results are amazing.',
      rating: 5,
      avatar: '/ease_up_logo_transparent.png'
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Users Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our community of users has to say about their experience with Ease Up. 
            Real stories from real people who have transformed their posture and reduced pain.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="card p-6 group hover:shadow-2xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12">
            <div className="flex justify-center items-center mb-4">
              <div className="flex text-yellow-400 mr-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-8 h-8 fill-current" />
                ))}
              </div>
              <span className="text-3xl font-bold text-white">4.8</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Excellent App Rating
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Based on 2,847 reviews from App Store and Google Play
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/apple-waitlist" 
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                />
              </a>
              <a 
                href="/android-waitlist" 
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/play_store_badge.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
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
