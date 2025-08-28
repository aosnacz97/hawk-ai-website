import React from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon, 
  ShieldCheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const Features: React.FC = () => {
  const features = [
    {
      icon: UserGroupIcon,
      title: 'Personalized Programs',
      description: 'Our AI analyzes your unique posture patterns and creates a customized program tailored specifically to your needs and goals.',
      color: 'blue'
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics, progress charts, and milestone achievements to stay motivated.',
      color: 'green'
    },
    {
      icon: CogIcon,
      title: 'Smart AI Technology',
      description: 'Advanced machine learning algorithms continuously adapt your program based on your progress and feedback.',
      color: 'purple'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Expert Guidance',
      description: 'Access to professional physiotherapist-approved exercises and techniques for safe, effective posture correction.',
      color: 'red'
    },
    {
      icon: ClockIcon,
      title: 'Quick Sessions',
      description: 'Efficient 5-15 minute daily sessions that fit into your busy schedule while delivering maximum results.',
      color: 'yellow'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile Convenience',
      description: 'Use anywhere, anytime with our mobile app. No equipment needed - just you and your smartphone.',
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

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Ease Up?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology meets professional posture correction expertise to deliver 
            personalized results that transform your daily life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card p-8 text-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${getIconColor(feature.color)} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">87%</div>
              <div className="text-gray-200">Pain Reduction</div>
              <div className="text-sm text-gray-400 mt-1">Average improvement in 30 days</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-gray-200">Active Users</div>
              <div className="text-sm text-gray-400 mt-1">Worldwide community</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-gray-200">App Rating</div>
              <div className="text-sm text-gray-400 mt-1">From thousands of reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
