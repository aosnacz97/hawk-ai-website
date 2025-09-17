import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "How long does it take to see vision improvement?",
      answer: "Most users notice reduced eye strain within 7-14 days of consistent use. For significant vision improvement, we recommend using the app for at least 5 minutes daily over 6-8 weeks."
    },
    {
      question: "Is Hawk AI suitable for all ages?",
      answer: "Yes, Hawk AI is designed for users of all ages. Our eye exercises are gentle and scientifically proven to be safe. However, children under 13 should use the app with parental supervision."
    },
    {
      question: "Do I need any equipment for the eye exercises?",
      answer: "No equipment required! Just your smartphone and a few minutes each day. All eye exercises can be done anywhere using just your device screen and natural lighting."
    },
    {
      question: "How does the 20-20-20 rule notification work?",
      answer: "Our smart notification system reminds you every 20 minutes to look at something 20 feet away for 20 seconds. This helps reduce digital eye strain and prevents computer vision syndrome."
    },
    {
      question: "Can I use the app if I wear glasses or contacts?",
      answer: "Absolutely! Hawk AI works great for people with glasses, contacts, or even those who've had eye surgery. The exercises complement your existing vision correction and can help reduce strain."
    },
    {
      question: "Is my eye health data secure and private?",
      answer: "Yes, your privacy is our priority. All eye health data is encrypted and stored securely on your device. We never share your personal vision information with third parties."
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
            Everything you need to know about Hawk AI. Can&apos;t find what you&apos;re looking for? 
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
              Our support team is here to help you get the most out of Hawk AI. 
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
