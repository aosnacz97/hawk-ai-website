import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ease Up - AI-Powered Posture Correction & Pain Relief',
  description: 'Transform your posture and relieve pain with AI-powered guidance. Download Ease Up for personalized posture correction and pain relief.',
  keywords: 'posture correction, pain relief, AI, mobile app, health, wellness, back pain, neck pain',
  authors: [{ name: 'Ease Up Team' }],
  creator: 'Ease Up',
  publisher: 'Ease Up',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ease-up.app'),
  openGraph: {
    title: 'Ease Up - AI-Powered Posture Correction & Pain Relief',
    description: 'Transform your posture and relieve pain with AI-powered guidance.',
    url: 'https://ease-up.app',
    siteName: 'Ease Up',
    images: [
      {
        url: '/ease_up_logo.png',
        width: 1200,
        height: 630,
        alt: 'Ease Up - AI-Powered Posture Correction',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ease Up - AI-Powered Posture Correction & Pain Relief',
    description: 'Transform your posture and relieve pain with AI-powered guidance.',
    images: ['/ease_up_logo.png'],
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/ease_up_logo.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
