import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppStoreProvider } from '../context/AppStoreContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hawk AI - AI-Powered Vision Improvement & Eye Exercise',
  description: 'Strengthen your vision and protect your eyes with AI-powered guidance. Download Hawk AI for personalized eye exercises and 20-20-20 rule notifications.',
  keywords: 'vision improvement, eye exercises, AI eye care, eye health app, vision app, 20-20-20 rule, eye health',
  authors: [{ name: 'Hawk AI Team' }],
  creator: 'Hawk AI',
  publisher: 'Hawk AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hawk-ai.xyz'),
  openGraph: {
    title: 'Hawk AI - AI-Powered Vision Improvement & Eye Exercise',
    description: 'Strengthen your vision and protect your eyes with AI-powered guidance.',
    url: 'https://hawk-ai.xyz',
    siteName: 'Hawk AI',
    images: [
      {
        url: '/hawkeye_logo.png',
        width: 1200,
        height: 630,
        alt: 'Hawk AI - AI-Powered Vision Improvement',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawk AI - AI-Powered Vision Improvement & Eye Exercise',
    description: 'Strengthen your vision and protect your eyes with AI-powered guidance.',
    images: ['/hawkeye_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <AppStoreProvider>
          {children}
        </AppStoreProvider>
      </body>
    </html>
  )
}
