import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Privacy Policy', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=cc219bc3-a2ff-42c3-88df-2e01c4010ade' }
    ],
    company: [
      { name: 'Terms of Service', href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=cb723aeb-378d-4323-8a45-ce047a08f0e7' }
    ]
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#instagram',
      icon: '/instagram.svg'
    },
    {
      name: 'TikTok',
      href: '#tiktok',
      icon: '/tiktok.png'
    },
    {
      name: 'Facebook',
      href: '#facebook',
      icon: '/facebook.png'
    },
    {
      name: 'YouTube',
      href: '#youtube',
      icon: '/youtube.svg'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src="/hawkeye_logo.png"
                  alt="Hawk AI Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-2xl"
                />
                <span className="ml-2 text-xl font-bold">Hawk AI</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The premier AI-powered vision improvement and eye health app. 
                Strengthen your vision, protect your eyes from strain, and enhance visual performance with 
                personalized eye exercise programs designed specifically for you.
              </p>
              
              {/* App Store Badges */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a 
                  href="/apple-waitlist" 
                  className="inline-block transition-transform hover:scale-105"
                >
                  <Image
                    src="/app_store_badge.png"
                    alt="Download on the App Store"
                    width={150}
                    height={50}
                    className="h-10 w-auto"
                  />
                </a>
                <a 
                  href="/android-waitlist" 
                  className="inline-block transition-transform hover:scale-105"
                >
                  <Image
                    src="/play_store_badge.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={50}
                    className="h-10 w-auto"
                  />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 brightness-0 invert"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Hawk AI. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=cc219bc3-a2ff-42c3-88df-2e01c4010ade" className="hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=cb723aeb-378d-4323-8a45-ce047a08f0e7" className="hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
