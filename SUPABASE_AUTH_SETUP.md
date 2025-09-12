# Supabase Auth Setup Guide

This guide explains how to set up Supabase authentication for both the iOS app and website to work seamlessly together.

## Overview

The authentication flow works as follows:

1. **User creates account in iOS app** → Supabase sends verification email
2. **User clicks email link** → Redirects to `https://www.ease-up.app/auth/verify`
3. **Website verifies email** → Redirects to iOS app via `easeup://auth/verified`
4. **iOS app receives callback** → User is now logged in

For magic links:
1. **User requests magic link in iOS app** → Supabase sends magic link email
2. **User clicks email link** → Redirects to `https://www.ease-up.app/auth/magic-link`
3. **Website processes magic link** → Redirects to iOS app via `easeup://auth/success`
4. **iOS app receives callback** → User is now logged in

## Environment Variables

Create a `.env.local` file in the website root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://www.ease-up.app
```

## Supabase Dashboard Configuration

### 1. Site URL Configuration

In your Supabase dashboard under Authentication > URL Configuration:

- **Site URL**: `https://www.ease-up.app`
- **Redirect URLs**: 
  - `https://www.ease-up.app/auth/verify`
  - `https://www.ease-up.app/auth/magic-link`

### 2. Email Templates

Configure your email templates in Supabase dashboard under Authentication > Email Templates:

#### Confirm signup template:
- **Subject**: `Confirm your signup`
- **Body**: Use the default template with `{{ .ConfirmationURL }}` which will redirect to `/auth/verify`

#### Magic Link template:
- **Subject**: `Your magic link`
- **Body**: Use the default template with `{{ .ConfirmationURL }}` which will redirect to `/auth/magic-link`

### 3. Auth Providers

Enable the following providers:
- ✅ Email
- ✅ Apple (for iOS app)

## iOS App Configuration

### 1. URL Schemes

In your iOS app's `Info.plist`, add these URL schemes:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.globaldominance.spinal</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.globaldominance.spinal</string>
        </array>
    </dict>
    <dict>
        <key>CFBundleURLName</key>
        <string>easeup</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>easeup</string>
        </array>
    </dict>
</array>
```

### 2. Supabase Configuration

Ensure your iOS app has the correct Supabase configuration in `Config.local.xcconfig`:

```xcconfig
SUPABASE_API_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
```

## Testing the Flow

### 1. Test Email Verification

1. Create a new account in the iOS app
2. Check your email for the verification link
3. Click the link - it should open in your browser
4. The website should verify the email and redirect to the iOS app
5. The iOS app should automatically log the user in

### 2. Test Magic Link

1. In the iOS app, tap "Send Magic Link"
2. Enter your email address
3. Check your email for the magic link
4. Click the link - it should open in your browser
5. The website should process the magic link and redirect to the iOS app
6. The iOS app should automatically log the user in

## Troubleshooting

### Common Issues

1. **Email links not working**: Check that redirect URLs are configured in Supabase dashboard
2. **iOS app not opening**: Verify URL schemes are configured in Info.plist
3. **Session not persisting**: Check that Supabase client is properly configured
4. **CORS errors**: Ensure your domain is whitelisted in Supabase

### Debug Steps

1. Check browser console for errors
2. Check iOS app logs for authentication errors
3. Verify Supabase dashboard shows the correct redirect URLs
4. Test with a fresh email address to avoid cached sessions

## Security Notes

- Never expose service role keys in client-side code
- Use environment variables for all sensitive configuration
- Regularly rotate your Supabase keys
- Monitor authentication logs for suspicious activity

## Support

If you encounter issues:

1. Check the Supabase dashboard logs
2. Review the iOS app console output
3. Check the website browser console
4. Verify all environment variables are set correctly
