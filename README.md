# Hawk AI Website - Next.js 15.5.2

A modern, responsive website for Hawk AI - an AI-powered vision improvement app that helps users strengthen their eyesight through science-based exercises and smart 20-20-20 rule notifications.

## 🚀 Features

- **Next.js 15.5.2** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** integration for waitlist management
- **Resend** integration for email functionality
- **Responsive design** for all devices
- **SEO optimized** with proper metadata

## 📁 Project Structure

```
hawk-ai-website-next/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── apple-waitlist/  # Apple waitlist page
│   │   ├── android-waitlist/# Android waitlist page
│   │   └── api/            # API routes
│   ├── components/         # React components
│   └── api/               # API utilities
├── public/                # Static assets
└── package.json          # Dependencies
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Email**: Resend
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hawk-ai-website-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Build

```bash
npm run build
npm start
```

## 📱 Pages

- **Home** (`/`) - Main landing page showcasing Hawk AI's vision improvement features
- **Apple Waitlist** (`/apple-waitlist`) - iOS app waitlist for Hawk AI
- **Android Waitlist** (`/android-waitlist`) - Android app waitlist for Hawk AI

## 🔧 API Routes

- **Contact Form** (`/api/contact`) - Handles contact form submissions

## 🎨 Components

- `Header` - Navigation and Hawk AI branding
- `Hero` - Main hero section highlighting vision improvement
- `Features` - Eye health and vision training features
- `HowItWorks` - How Hawk AI vision improvement works
- `Testimonials` - User success stories with vision improvement
- `FAQ` - Frequently asked questions about eye health and vision exercises
- `ContactForm` - Contact form for support
- `Footer` - Site footer

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, email support@hawk-ai.app

## 📋 Key Features

- **Science-Based Eye Exercises** - Personalized vision improvement programs
- **20-20-20 Rule Notifications** - Smart reminders to prevent digital eye strain
- **Vision Progress Tracking** - Monitor eye health improvements with analytics
- **Eye Health Protection** - Optometrist-approved techniques
- **Quick Eye Workouts** - 3-10 minute daily sessions
- **Smart Vision AI** - Adaptive algorithms based on screen time patterns
