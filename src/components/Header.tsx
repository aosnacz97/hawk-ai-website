'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/hawkeye_logo.png"
              alt="Hawk AI Logo"
              width={36}
              height={36}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl"
            />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">Hawk AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="/apple-waitlist"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/app_store_badge.png"
                alt="Download on the App Store"
                width={110}
                height={36}
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
                width={110}
                height={36}
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2.5 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-row gap-3 mt-4 px-3">
                <a
                  href="/apple-waitlist"
                  className="inline-block transition-transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src="/app_store_badge.png"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                    className="h-9 w-auto"
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
                    width={120}
                    height={40}
                    className="h-9 w-auto"
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
