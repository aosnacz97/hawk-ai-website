# Supabase Migration Guide

## Overview

This project has been migrated to use **Supabase's built-in authentication system** for email verification and magic links. This provides better security, reliability, and reduces maintenance overhead.

## What Changed

### ✅ New Supabase Endpoints (Use These)

| Purpose | New Endpoint | Description |
|---------|-------------|-------------|
| Send Verification Email | `POST /api/auth/send-verification-supabase` | Sends verification emails using Supabase |
| Verify Email | `POST /api/auth/verify-email-supabase` | Verifies email tokens using Supabase |
| Send Magic Link | `POST /api/auth/send-magic-link-supabase` | Sends magic links using Supabase |
| Verify Magic Link | `POST /api/auth/verify-magic-link-supabase` | Verifies magic link tokens using Supabase |

### ❌ Deprecated Endpoints (Don't Use)

| Purpose | Deprecated Endpoint | Replacement |
|---------|-------------------|-------------|
| Send Verification Email | `POST /api/auth/send-verification` | `POST /api/auth/send-verification-supabase` |
| Verify Email | `POST /api/auth/verify-email` | `POST /api/auth/verify-email-supabase` |
| Send Magic Link | `POST /api/auth/send-magic-link` | `POST /api/auth/send-magic-link-supabase` |
| Verify Magic Link | `POST /api/auth/verify-magic-link` | `POST /api/auth/verify-magic-link-supabase` |

## Migration Steps

### 1. Update Frontend Components

**Before:**
```typescript
// Old custom token system
const response = await fetch('/api/auth/send-verification', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name }),
});
```

**After:**
```typescript
// New Supabase system
const response = await fetch('/api/auth/send-verification-supabase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
```

### 2. Update iOS App

The iOS app has been updated to use the website's Supabase endpoints instead of calling Supabase directly. This centralizes authentication through your website.

### 3. Token Format Changes

- **Old**: Custom JWT tokens with custom validation
- **New**: Supabase UUID tokens (e.g., `497a81b9-3b78-411a-b873-98f1c43583ed`)

### 4. Verification Pages

- **Email Verification**: `/verify-email` - Now only uses Supabase verification
- **Magic Link**: `/auth/magic-link` - New page for magic link verification

## Benefits of Migration

1. **Better Security**: Supabase handles token generation, validation, and expiration
2. **Reduced Maintenance**: No need to maintain custom token logic
3. **Consistent Experience**: Same authentication flow across iOS and web
4. **Built-in Features**: Email templates, rate limiting, and security features
5. **Simplified Codebase**: Removed custom authentication utilities

## Environment Variables Required

Make sure these are set in your `.env.local`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=https://www.ease-up.app
```

## Testing

1. Test email verification flow
2. Test magic link authentication
3. Verify iOS app integration
4. Check error handling for expired/invalid tokens

## Rollback Plan

If you need to rollback:
1. Revert component changes to use old endpoints
2. Remove deprecation notices from old endpoints
3. Update iOS app to use direct Supabase calls

## Support

For issues with the migration, check:
- Supabase dashboard for authentication logs
- Browser console for client-side errors
- Server logs for API endpoint errors
