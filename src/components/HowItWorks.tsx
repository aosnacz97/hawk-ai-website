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
      description: 'Install our vision improvement app from the App Store or Google Play Store',
      color: 'blue'
    },
    {
      number: '2',
      icon: EyeIcon,
      title: 'Vision Assessment',
      description: 'Take a quick eye health assessment to help our AI understand your visual needs and habits',
      color: 'green'
    },
    {
      number: '3',
      icon: BellIcon,
      title: 'Enable Smart Notifications',
      description: 'Set up 20-20-20 rule reminders and receive your personalized eye exercise program',
      color: 'purple'
    },
    {
      number: '4',
      icon: ChartBarIcon,
      title: 'Track Vision Progress',
      description: 'Monitor your eye health improvement with detailed analytics and visual performance metrics',
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
    <section id="how-it-works" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Hawk AI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Improve your vision and protect your eye health in 4 simple steps. 
            Our AI-powered system makes it easy to strengthen your vision and reduce eye strain.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-gray-200 text-2xl font-bold text-gray-700 mb-4 group-hover:border-blue-500 transition-colors duration-300">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getIconColor(step.color)} group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Ready to Improve Your Vision?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already strengthened their vision and reduced eye strain with Hawk AI. 
              Start your journey to better eye health today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            
            <p className="text-sm text-gray-500 mt-4">
              Free to download • No equipment needed • Improve vision in 14 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
