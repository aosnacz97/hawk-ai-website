'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getBlogPost, blogPosts } from '../../../lib/blogPosts';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Process content to convert markdown-style links and bold text
  const processContent = (content: string) => {
    // Convert markdown links [text](url) to HTML
    let processed = content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 decoration-blue-200 hover:decoration-blue-400 transition-colors">$1</a>'
    );
    // Convert **bold** to strong tags
    processed = processed.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-gray-900">$1</strong>'
    );
    return processed;
  };

  // Process content sections
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ');
        if (text.trim()) {
          elements.push(
            <p
              key={elements.length}
              className="text-gray-600 leading-[1.8] mb-6 text-[17px]"
              dangerouslySetInnerHTML={{ __html: processContent(text) }}
            />
          );
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={elements.length} className="space-y-3 mb-6 ml-1">
            {listItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-600 text-[17px] leading-[1.8]"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-[11px]" />
                <span dangerouslySetInnerHTML={{ __html: processContent(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        flushParagraph();
        flushList();
        return;
      }

      // H2 headers
      if (trimmedLine.startsWith('## ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h2 key={elements.length} className="text-2xl sm:text-[28px] font-bold text-gray-900 mt-12 mb-5 tracking-tight">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
        return;
      }

      // H3 headers
      if (trimmedLine.startsWith('### ')) {
        flushParagraph();
        flushList();
        elements.push(
          <h3 key={elements.length} className="text-xl sm:text-[22px] font-semibold text-gray-900 mt-8 mb-4 tracking-tight">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Bold text as subheadings (standalone bold lines)
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && !trimmedLine.slice(2, -2).includes('**')) {
        flushParagraph();
        flushList();
        elements.push(
          <p key={elements.length} className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            {trimmedLine.replace(/\*\*/g, '')}
          </p>
        );
        return;
      }

      // List items
      if (trimmedLine.startsWith('- ')) {
        flushParagraph();
        listItems.push(trimmedLine.replace('- ', ''));
        return;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(trimmedLine)) {
        flushParagraph();
        listItems.push(trimmedLine.replace(/^\d+\.\s/, ''));
        return;
      }

      // Regular paragraph content
      flushList();
      currentParagraph.push(trimmedLine);
    });

    flushParagraph();
    flushList();

    return elements;
  };

  // Get related posts (exclude current post)
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

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
              href="/blog"
              className="text-sm sm:text-base text-gray-500 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Articles
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{post.readTime}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 leading-[1.15] tracking-tight mb-8">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden">
                <Image
                  src="/hawkeye_logo.png"
                  alt="Hawk AI Team"
                  width={48}
                  height={48}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg"
                />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.authorCredentials}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-10 sm:py-12 lg:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Content */}
            <div className="article-content">
              {renderContent(post.content)}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-5 sm:p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-1">Medical Disclaimer</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    This article is for informational purposes only and does not constitute medical advice. Always consult with a qualified eye care professional for diagnosis and treatment of any eye condition.
                  </p>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
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
                    <p className="text-sm font-medium text-gray-900">Written by {post.author}</p>
                    <p className="text-xs text-gray-500">{post.authorCredentials}</p>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  More articles →
                </Link>
              </div>
            </div>

            {/* In-Article CTA */}
            <div className="mt-10 p-6 sm:p-8 bg-gray-900 rounded-2xl text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Start Improving Your Eye Health Today
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Download Hawk AI for personalized eye exercises and smart 20-20-20 reminders.
              </p>
              <div className="flex flex-row gap-3 justify-center items-center">
                <Link href="/apple-waitlist" className="inline-block transition-transform hover:scale-105">
                  <Image
                    src="/app_store_badge.png"
                    alt="Download on the App Store"
                    width={140}
                    height={46}
                    className="h-10 sm:h-11 w-auto"
                  />
                </Link>
                <Link href="/android-waitlist" className="inline-block transition-transform hover:scale-105">
                  <Image
                    src="/play_store_badge.png"
                    alt="Get it on Google Play"
                    width={140}
                    height={46}
                    className="h-10 sm:h-11 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                >
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-4 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500">{relatedPost.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 sm:py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Improve Your Eye Health?
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8">
              Download Hawk AI for science-based eye exercises and smart 20-20-20 reminders.
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <Link href="/apple-waitlist" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/app_store_badge.png"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="h-11 sm:h-12 w-auto"
                />
              </Link>
              <Link href="/android-waitlist" className="inline-block transition-transform hover:scale-105">
                <Image
                  src="/play_store_badge.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
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
              <Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link>
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
