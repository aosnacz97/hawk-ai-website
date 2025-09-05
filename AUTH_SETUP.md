# Authentication Setup Guide

This guide explains how to set up user verification and magic links using Resend in your Ease Up website.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Resend API Configuration
RESEND_API_KEY=your_resend_api_key_here

# Application URL (for generating links in emails)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Custom email domain (if you have a custom domain with Resend)
# RESEND_FROM_EMAIL=noreply@yourdomain.com
```

## Getting Your Resend API Key

1. Go to [Resend.com](https://resend.com) and create an account
2. Navigate to the API Keys section in your dashboard
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## Features Implemented

### Email Verification
- **Endpoint**: `POST /api/auth/send-verification`
- **Purpose**: Send verification emails to new users
- **Token Expiry**: 48 hours
- **Template**: Beautiful HTML email with verification button

### Magic Link Authentication
- **Endpoint**: `POST /api/auth/send-magic-link`
- **Purpose**: Passwordless login via email
- **Token Expiry**: 24 hours
- **Template**: Secure login link with one-time use

## API Endpoints

### Send Verification Email
```typescript
POST /api/auth/send-verification
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name" // optional
}
```

### Verify Email
```typescript
POST /api/auth/verify-email
Content-Type: application/json

{
  "token": "verification_token_from_email"
}
```

### Send Magic Link
```typescript
POST /api/auth/send-magic-link
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "User Name" // optional
}
```

### Verify Magic Link
```typescript
POST /api/auth/verify-magic-link
Content-Type: application/json

{
  "token": "magic_link_token_from_email"
}
```

## Frontend Components

### EmailVerification Component
- Located at: `src/components/EmailVerification.tsx`
- Handles sending verification emails
- Shows success/error states
- Mobile-responsive design

### MagicLinkLogin Component
- Located at: `src/components/MagicLinkLogin.tsx`
- Handles sending magic links
- Shows success/error states
- Mobile-responsive design

## Demo Pages

### Auth Demo
- **URL**: `/auth-demo`
- **Purpose**: Test both verification and magic link features
- **Features**: Tabbed interface, API documentation

### Individual Pages
- **Verification**: `/auth/verify`
- **Login**: `/auth/login`
- **Email Verification Handler**: `/verify-email?token=...`
- **Magic Link Handler**: `/auth/magic-link?token=...`

## Security Features

### Token Security
- Cryptographically secure random tokens
- Base64URL encoding for URL safety
- Configurable expiration times
- One-time use for magic links

### Email Security
- HTML email templates with security warnings
- Clear expiration notices
- Instructions for users who didn't request the email

## Customization

### Email Templates
- Located at: `src/lib/email-templates.ts`
- Customize colors, branding, and content
- Responsive HTML design
- Support for custom app names

### Token Configuration
- Located at: `src/lib/auth-utils.ts`
- Adjust expiration times
- Modify token generation logic
- Add additional security measures

## Testing

1. Start your development server: `npm run dev`
2. Visit `/auth-demo` to test the features
3. Use a real email address to receive test emails
4. Check your email for verification/magic link emails

## Production Considerations

### Domain Setup
1. Add your domain to Resend
2. Configure DNS records for email authentication
3. Update `RESEND_FROM_EMAIL` to use your domain
4. Update `NEXT_PUBLIC_APP_URL` to your production URL

### Database Integration
The current implementation is stateless. For production, consider:
- Storing user verification status in a database
- Implementing session management
- Adding rate limiting for API endpoints
- Logging authentication events

### Security Enhancements
- Add rate limiting to prevent abuse
- Implement CSRF protection
- Add request logging and monitoring
- Consider adding CAPTCHA for high-volume endpoints

## Troubleshooting

### Common Issues

1. **"Email service not configured"**
   - Check that `RESEND_API_KEY` is set in your environment variables
   - Restart your development server after adding the key

2. **"Invalid email format"**
   - Ensure the email address is properly formatted
   - Check for extra spaces or special characters

3. **"Failed to send email"**
   - Verify your Resend API key is valid
   - Check your Resend account for any restrictions
   - Ensure your domain is properly configured in Resend

4. **Links not working**
   - Check that `NEXT_PUBLIC_APP_URL` is set correctly
   - Ensure the URL matches your current environment (localhost for dev, production URL for prod)

### Debug Mode
Add console logging to the API endpoints to debug issues:
```typescript
console.log('Sending verification email to:', email);
console.log('Generated token:', token);
console.log('Verification URL:', verificationUrl);
```
