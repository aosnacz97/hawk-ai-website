'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../lib/blogPosts';

export default function BlogPage() {
  // Featured post is the first one
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center group">
              <Image
                src="/hawkeye_logo.png"
                alt="Hawk AI Logo"
                width={36}
                height={36}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl"
              />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Hawk AI</span>
            </Link>
            <Link
              href="/"
              className="text-sm sm:text-base text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 text-center">
          <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-4">
            Eye Health Blog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Evidence-Based Eye Health Insights
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Science-backed articles on vision health, digital eye strain, and visual training to help you understand and protect your eyes.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-10 sm:py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-10 hover:bg-gray-100 transition-all duration-300 max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Featured</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden">
                      <Image
                        src="/hawkeye_logo.png"
                        alt="Hawk AI Team"
                        width={32}
                        height={32}
                        className="w-7 h-7 rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{featuredPost.author}</p>
                      <p className="text-xs text-gray-500">{featuredPost.readTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:flex-shrink-0">
                <div className="w-full lg:w-48 h-32 lg:h-48 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                  <Image
                    src="/hawkeye_logo.png"
                    alt="Article illustration"
                    width={80}
                    height={80}
                    className="w-16 h-16 lg:w-20 lg:h-20 opacity-80"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-500 mb-5 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden">
                      <Image
                        src="/hawkeye_logo.png"
                        alt="Hawk AI Team"
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{post.author}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Take Control of Your Eye Health
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8">
              Download Hawk AI for personalized eye exercises and smart 20-20-20 reminders.
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <Link href="/apple-waitlist" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  width={160}
                  height={53}
                  className="h-11 sm:h-12 w-auto"
                />
              </Link>
              <Link href="/android-waitlist" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/play_store_badge.png"
                  alt="Get it on Google Play"
                  width={160}
                  height={53}
                  className="h-11 sm:h-12 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} Hawk AI. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
              <Link href="/#contact" className="hover:text-white transition-colors duration-200">Contact</Link>
              <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=cc219bc3-a2ff-42c3-88df-2e01c4010ade" className="hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
