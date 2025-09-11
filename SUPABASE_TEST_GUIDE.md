# Supabase Authentication Test Guide

## Testing the Consolidated Supabase Flow

### 1. Test Email Verification

#### Step 1: Send Verification Email
```bash
curl -X POST https://www.ease-up.app/api/auth/send-verification-supabase \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Expected Response:**
```json
{
  "message": "Verification email sent successfully",
  "email": "test@example.com"
}
```

#### Step 2: Check Email
- Look for email from Supabase with verification link
- Link should point to: `https://www.ease-up.app/verify-email?code=UUID_TOKEN`

#### Step 3: Click Verification Link
- Should redirect to `/verify-email` page
- Should show "Verifying Your Email" animation
- Should show "Email Verified Successfully!" message

### 2. Test Magic Link Authentication

#### Step 1: Send Magic Link
```bash
curl -X POST https://www.ease-up.app/api/auth/send-magic-link-supabase \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Expected Response:**
```json
{
  "message": "Magic link sent successfully",
  "email": "test@example.com"
}
```

#### Step 2: Check Email
- Look for email from Supabase with magic link
- Link should point to: `https://www.ease-up.app/auth/magic-link?code=UUID_TOKEN`

#### Step 3: Click Magic Link
- Should redirect to `/auth/magic-link` page
- Should show "Verifying Your Magic Link" animation
- Should show "Welcome Back!" success message

### 3. Test iOS App Integration

#### Step 1: Update iOS App
- Ensure iOS app is using the new endpoints
- Test sending verification email from iOS app
- Test clicking verification link from email

#### Step 2: Verify Deep Links
- Test that verification links open the iOS app
- Test that magic links open the iOS app
- Verify proper error handling

### 4. Test Error Handling

#### Invalid Token
```bash
curl -X POST https://www.ease-up.app/api/auth/verify-email-supabase \
  -H "Content-Type: application/json" \
  -d '{"code": "invalid-token"}'
```

**Expected Response:**
```json
{
  "message": "Email link is invalid or has expired"
}
```

#### Missing Email
```bash
curl -X POST https://www.ease-up.app/api/auth/send-verification-supabase \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "message": "Email is required"
}
```

### 5. Test Website Components

#### EmailVerification Component
1. Go to any page with email verification
2. Enter email address
3. Click "Send Verification Email"
4. Should use Supabase endpoint
5. Should show success message

#### MagicLinkLogin Component
1. Go to any page with magic link login
2. Enter email address
3. Click "Send Magic Link"
4. Should use Supabase endpoint
5. Should show success message

### 6. Monitor Logs

Check server logs for:
- Supabase API calls
- Token verification attempts
- Error messages
- Performance metrics

### 7. Verify Deprecated Endpoints

Test that deprecated endpoints still work but show deprecation warnings:
- `/api/auth/send-verification` (should still work)
- `/api/auth/verify-email` (should still work)
- `/api/auth/send-magic-link` (should still work)
- `/api/auth/verify-magic-link` (should still work)

## Success Criteria

✅ All new Supabase endpoints work correctly  
✅ Email verification flow completes successfully  
✅ Magic link authentication works  
✅ iOS app integration functions properly  
✅ Error handling works as expected  
✅ Deprecated endpoints still function  
✅ No console errors or warnings  
✅ Proper user feedback messages  

## Troubleshooting

### Common Issues

1. **"Email link is invalid or has expired"**
   - Check if token is correct UUID format
   - Verify Supabase environment variables
   - Check if token was already used

2. **"Email service not configured"**
   - Verify Supabase environment variables
   - Check Supabase project settings

3. **Network errors**
   - Check internet connection
   - Verify API endpoint URLs
   - Check CORS settings

### Debug Steps

1. Check browser console for errors
2. Check server logs for API errors
3. Verify environment variables
4. Test with curl commands
5. Check Supabase dashboard for logs
