import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Fix Your Posture,
                <span className="text-gray-900 block">Relieve Pain</span>
                <span className="text-gray-900 block">Feel Better</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ease Up provides personalized posture correction and pain relief programs 
                designed specifically for you. Our AI-powered app analyzes your movement 
                patterns and creates a customized plan to improve your posture, reduce pain, 
                and enhance flexibility.
              </p>

              {/* App Store Badges */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="/apple-waitlist" 
                  className="inline-block transition-transform hover:scale-105"
                >
                  <Image
                    src="/app_store_badge.png"
                    alt="Download on the App Store"
                    width={200}
                    height={70}
                    className="h-14 w-auto"
                  />
                </a>
                <a 
                  href="/android-waitlist" 
                  className="inline-block transition-transform hover:scale-105"
                >
                  <Image
                    src="/play_store_badge.png"
                    alt="Get it on Google Play"
                    width={200}
                    height={70}
                    className="h-14 w-auto"
                  />
                </a>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">4.8</span>
                <span className="text-gray-600">(2,847 reviews)</span>
              </div>

              <p className="text-sm text-gray-500">
                Join thousands of users who have transformed their posture and reduced pain with Ease Up
              </p>
            </div>
          </div>

          {/* Right Content - App Preview */}
          <div className="lg:w-1/2 lg:pl-12">
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/ease_up_logo_transparent.png"
                  alt="Ease Up App Preview"
                  width={400}
                  height={400}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="relative">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
