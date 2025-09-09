import React, { useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/ease_up_logo.png"
              alt="Ease Up Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-2xl"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">Ease Up</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/apple-waitlist" 
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/app_store_badge.png"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </a>
            <a 
              href="/android-waitlist" 
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/play_store_badge.png"
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <a 
                  href="/apple-waitlist" 
                  className="inline-block transition-transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src="/app_store_badge.png"
                    alt="Download on the App Store"
                    width={150}
                    height={50}
                    className="h-10 w-auto mx-auto"
                  />
                </a>
                <a 
                  href="/android-waitlist" 
                  className="inline-block transition-transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src="/play_store_badge.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={50}
                    className="h-10 w-auto mx-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
