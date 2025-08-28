import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "How long does it take to see results?",
      answer: "Most users notice improvement within 7-14 days of consistent use. For best results, we recommend using the app for at least 10 minutes daily."
    },
    {
      question: "Is the app suitable for all ages?",
      answer: "Yes, Ease Up is designed for users of all ages and fitness levels. Our exercises are gentle and can be modified to suit individual needs."
    },
    {
      question: "Do I need any equipment?",
      answer: "No equipment required! Just your smartphone and a few minutes each day. All exercises use your body weight and can be done anywhere."
    },
    {
      question: "How does the posture tracking work?",
      answer: "Our advanced AI technology uses your phone's camera to analyze your posture in real-time, providing instant feedback and personalized recommendations."
    },
    {
      question: "Can I use the app if I have existing back pain?",
      answer: "Yes, but we recommend consulting with your healthcare provider first. Ease Up is designed to help prevent and relieve mild posture-related discomfort."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We take your privacy seriously. All data is encrypted and stored securely. We never share your personal information with third parties."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about Ease Up. Can&apos;t find what you&apos;re looking for? 
            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Get in touch with us.
            </a>
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of Ease Up. 
              We typically respond within 24 hours.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Support
              <svg
                className="ml-2 w-5 h-5"
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
