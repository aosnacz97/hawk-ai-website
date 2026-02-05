'use client';

import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "How often should I use Hawk AI?",
      answer: "For best results, we recommend consistent daily use of the app for at least 5 minutes. Building a regular routine helps establish healthy eye care habits."
    },
    {
      question: "Is Hawk AI suitable for all ages?",
      answer: "Yes, Hawk AI is designed for users of all ages. Our exercises are gentle and safe. Children under 13 should use the app with parental supervision."
    },
    {
      question: "What do I need to use Hawk AI?",
      answer: "You'll need a smartphone with the Hawk AI app installed. Some exercises may require additional equipment which will be specified in the app."
    },
    {
      question: "How does the 20-20-20 rule work?",
      answer: "Our smart notification system reminds you every 20 minutes to look at something 20 feet away for 20 seconds. This widely recommended practice encourages regular breaks during screen use."
    },
    {
      question: "Can I use it with glasses or contacts?",
      answer: "Yes! Hawk AI works great for people with glasses, contacts, or even those who've had eye surgery. The exercises complement your existing vision correction."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, your privacy is our priority. All data is encrypted and stored securely. We never share your personal information with third parties."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Hawk AI.{' '}
            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">
              Get in touch
            </a>{' '}
            for more help.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-3 sm:gap-4 md:gap-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  {item.question}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-10 md:mt-16">
          <div className="bg-gray-900 rounded-2xl p-6 md:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 max-w-xl mx-auto">
              Our support team is here to help. We typically respond within 24 hours.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Contact Support
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
