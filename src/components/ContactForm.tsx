'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        setErrorMessage(errorData.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      content: 'support@hawk-ai.xyz',
      href: 'mailto:support@hawk-ai.xyz',
      description: 'Get help with your account or technical issues'
    },
    {
      icon: MapPinIcon,
      title: 'Office Location',
      content: '5900 Balcones Drive, STE 100, Austin, TX 78731',
      href: 'https://maps.google.com/?q=5900+Balcones+Drive+STE+100+Austin+TX+78731',
      description: 'Visit our headquarters in Austin, Texas'
    },
    {
      icon: ClockIcon,
      title: 'Response Time',
      content: 'Within 24 hours',
      href: '#',
      description: 'We typically respond to all inquiries within one business day'
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? Need support? We&apos;re here to help you achieve better vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Contact Information
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                Reach out to us through any of these channels.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="group">
                  <a
                    href={info.href}
                    className="block p-4 sm:p-5 lg:p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                          <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-900 font-medium mb-1 truncate">
                          {info.content}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed hidden sm:block">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 lg:p-8 text-white">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Why Choose Hawk AI?
              </h4>
              <div className="space-y-2 sm:space-y-3 text-gray-200 text-sm sm:text-base">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span>AI-powered vision analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span>Personalized eye exercise programs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span>20-20-20 rule notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span>Expert support when you need it</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 lg:p-8 xl:p-10">
            <div className="mb-6 lg:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Fill out the form and we&apos;ll get back to you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="What can we help you with?"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register('message', { required: 'Message is required' })}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Tell us more about your question..."
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs sm:text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm sm:text-base text-green-800">
                    Thank you! Your message has been sent. We&apos;ll respond within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm sm:text-base text-red-800">
                    {errorMessage || 'Sorry, there was an error. Please email us directly at support@hawk-ai.xyz'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-4 text-sm sm:text-base lg:text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
