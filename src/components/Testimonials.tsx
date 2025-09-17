import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Graphic Designer',
      content: 'Hawk AI completely transformed my eye health! After 10 hours staring at screens, I used to have terrible eye strain. The 20-20-20 reminders and eye exercises made all the difference.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Mike R.',
      role: 'Software Developer',
      content: 'The personalized eye exercise program is incredible. The AI really understands my screen time patterns and the exercises fit perfectly into my coding breaks. Eye strain reduced by 95%!',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Jennifer L.',
      role: 'Vision Therapist',
      content: 'As a vision therapist, I\'m very particular about eye exercise apps. Hawk AI is the real deal - scientifically sound, effective, and the progress tracking helps my patients.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'David K.',
      role: 'Truck Driver',
      content: 'After years of eye fatigue from long driving shifts, Hawk AI helped me understand proper eye care. The exercises I can do during rest stops have been life changing!',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Emma T.',
      role: 'Student',
      content: 'Perfect for students! Quick eye exercises between study sessions, and the app reminds me to take vision breaks. My eye strain is gone and I can focus so much better.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
    },
    {
      name: 'Robert P.',
      role: 'Retired',
      content: 'At 67, I thought my declining vision was inevitable. Hawk AI proved me wrong! The gentle eye exercises are perfect for my age and my visual clarity has improved.',
      rating: 5,
      avatar: '/hawkeye_logo_transparent.png'
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
            See what our community of users has to say about their experience with Hawk AI. 
            Real stories from real people who have improved their vision and reduced eye strain.
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
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
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
              <span className="text-3xl font-bold text-white">4.9</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Excellent App Rating
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Based on 3,251 reviews from App Store and Google Play
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/apple-waitlist" 
                className="inline-block transition-transform hover:scale-105"
              >
                <Image
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  width={180}
                  height={60}
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
                  width={180}
                  height={60}
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
