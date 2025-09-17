import React from 'react';
import { 
  EyeIcon, 
  ChartBarIcon, 
  CogIcon, 
  ShieldCheckIcon,
  ClockIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Features: React.FC = () => {
  const features = [
    {
      icon: EyeIcon,
      title: 'Science-Based Eye Exercises',
      description: 'Our AI creates personalized vision improvement programs with scientifically-proven exercises to strengthen your eyes and enhance visual performance.',
      color: 'blue'
    },
    {
      icon: ChartBarIcon,
      title: 'Vision Progress Tracking',
      description: 'Monitor your eye health improvement with detailed analytics, visual acuity measurements, and milestone achievements.',
      color: 'green'
    },
    {
      icon: BellIcon,
      title: '20-20-20 Rule Notifications',
      description: 'Smart reminders every 20 minutes to look at something 20 feet away for 20 seconds, protecting your eyes from digital strain.',
      color: 'purple'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Eye Health Protection',
      description: 'Access to optometrist-approved techniques and exercises for safe, effective vision improvement and eye strain prevention.',
      color: 'red'
    },
    {
      icon: ClockIcon,
      title: 'Quick Eye Workouts',
      description: 'Efficient 3-10 minute daily eye exercise sessions that fit into your busy schedule while strengthening your vision.',
      color: 'yellow'
    },
    {
      icon: CogIcon,
      title: 'Smart Vision AI',
      description: 'Advanced algorithms that adapt your eye exercise program based on your progress, screen time patterns, and visual needs.',
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
            Why Choose Hawk AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology meets proven vision improvement science to deliver 
            personalized eye care that strengthens your vision and protects your eye health.
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
              <div className="text-4xl md:text-5xl font-bold mb-2">92%</div>
              <div className="text-gray-200">Eye Strain Reduction</div>
              <div className="text-sm text-gray-400 mt-1">Average improvement in 21 days</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">35K+</div>
              <div className="text-gray-200">Active Users</div>
              <div className="text-sm text-gray-400 mt-1">Vision improvement community</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9★</div>
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
