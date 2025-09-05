import crypto from 'crypto';

// Token configuration
const TOKEN_EXPIRY_HOURS = 24; // Magic links expire in 24 hours
const VERIFICATION_EXPIRY_HOURS = 48; // Verification tokens expire in 48 hours

export interface TokenPayload {
  email: string;
  type: 'verification' | 'magic_link';
  expiresAt: number;
  nonce: string;
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a token payload for email verification or magic links
 */
export function createTokenPayload(
  email: string, 
  type: 'verification' | 'magic_link'
): TokenPayload {
  const now = Date.now();
  const expiryHours = type === 'verification' ? VERIFICATION_EXPIRY_HOURS : TOKEN_EXPIRY_HOURS;
  
  return {
    email: email.toLowerCase().trim(),
    type,
    expiresAt: now + (expiryHours * 60 * 60 * 1000),
    nonce: generateSecureToken()
  };
}

/**
 * Encode token payload to base64 string
 */
export function encodeToken(payload: TokenPayload): string {
  const jsonString = JSON.stringify(payload);
  return Buffer.from(jsonString).toString('base64url');
}

/**
 * Decode token from base64 string
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const jsonString = Buffer.from(token, 'base64url').toString('utf-8');
    return JSON.parse(jsonString) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Validate if token is still valid (not expired)
 */
export function isTokenValid(token: string): { valid: boolean; payload?: TokenPayload; error?: string } {
  const payload = decodeToken(token);
  
  if (!payload) {
    return { valid: false, error: 'Invalid token format' };
  }
  
  if (Date.now() > payload.expiresAt) {
    return { valid: false, error: 'Token has expired' };
  }
  
  return { valid: true, payload };
}

/**
 * Generate a secure URL-safe token for email verification or magic links
 */
export function generateAuthToken(email: string, type: 'verification' | 'magic_link'): string {
  const payload = createTokenPayload(email, type);
  return encodeToken(payload);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}
