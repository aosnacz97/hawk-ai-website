import crypto from 'crypto';

// Enhanced token configuration
const TOKEN_EXPIRY_HOURS = 24; // Magic links expire in 24 hours
const VERIFICATION_EXPIRY_HOURS = 48; // Verification tokens expire in 48 hours
const TOKEN_LENGTH = 32; // 256-bit tokens

export interface SecureTokenPayload {
  email: string;
  type: 'verification' | 'magic_link';
  expiresAt: number;
  nonce: string;
  issuedAt: number;
  version: string; // For future token format changes
}

// In-memory token blacklist (use Redis in production)
const tokenBlacklist = new Set<string>();

export interface TokenValidationResult {
  valid: boolean;
  payload?: SecureTokenPayload;
  error?: string;
  reason?: 'expired' | 'invalid_format' | 'blacklisted' | 'invalid_type';
}

/**
 * Generate a cryptographically secure random token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
}

/**
 * Create a secure token payload with additional security features
 */
export function createSecureTokenPayload(
  email: string, 
  type: 'verification' | 'magic_link'
): SecureTokenPayload {
  const now = Date.now();
  const expiryHours = type === 'verification' ? VERIFICATION_EXPIRY_HOURS : TOKEN_EXPIRY_HOURS;
  
  return {
    email: sanitizeEmail(email),
    type,
    expiresAt: now + (expiryHours * 60 * 60 * 1000),
    nonce: generateSecureToken(),
    issuedAt: now,
    version: '1.0'
  };
}

/**
 * Create a secure token with HMAC signature
 */
export function createSecureToken(payload: SecureTokenPayload): string {
  const secret = process.env.TOKEN_SECRET || 'fallback-secret-change-in-production';
  
  // Create the token data
  const tokenData = {
    ...payload,
    signature: createHMACSignature(payload, secret)
  };
  
  const jsonString = JSON.stringify(tokenData);
  return Buffer.from(jsonString).toString('base64url');
}

/**
 * Create HMAC signature for token integrity
 */
function createHMACSignature(payload: SecureTokenPayload, secret: string): string {
  const dataToSign = `${payload.email}:${payload.type}:${payload.expiresAt}:${payload.nonce}:${payload.issuedAt}:${payload.version}`;
  return crypto.createHmac('sha256', secret).update(dataToSign).digest('hex');
}

/**
 * Verify HMAC signature
 */
function verifyHMACSignature(payload: SecureTokenPayload, signature: string, secret: string): boolean {
  const expectedSignature = createHMACSignature(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

/**
 * Decode and validate secure token
 */
export function decodeSecureToken(token: string): TokenValidationResult {
  try {
    const jsonString = Buffer.from(token, 'base64url').toString('utf-8');
    const tokenData = JSON.parse(jsonString);
    
    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      return { 
        valid: false, 
        error: 'Token has been revoked', 
        reason: 'blacklisted' 
      };
    }
    
    // Validate token structure
    if (!tokenData.email || !tokenData.type || !tokenData.expiresAt || !tokenData.nonce || !tokenData.signature) {
      return { 
        valid: false, 
        error: 'Invalid token format', 
        reason: 'invalid_format' 
      };
    }
    
    const payload: SecureTokenPayload = {
      email: tokenData.email,
      type: tokenData.type,
      expiresAt: tokenData.expiresAt,
      nonce: tokenData.nonce,
      issuedAt: tokenData.issuedAt,
      version: tokenData.version || '1.0'
    };
    
    // Verify signature
    const secret = process.env.TOKEN_SECRET || 'fallback-secret-change-in-production';
    if (!verifyHMACSignature(payload, tokenData.signature, secret)) {
      return { 
        valid: false, 
        error: 'Invalid token signature', 
        reason: 'invalid_format' 
      };
    }
    
    // Check expiration
    if (Date.now() > payload.expiresAt) {
      return { 
        valid: false, 
        error: 'Token has expired', 
        reason: 'expired' 
      };
    }
    
    return { valid: true, payload };
    
  } catch {
    return { 
      valid: false, 
      error: 'Invalid token format', 
      reason: 'invalid_format' 
    };
  }
}

/**
 * Generate a secure auth token
 */
export function generateSecureAuthToken(email: string, type: 'verification' | 'magic_link'): string {
  const payload = createSecureTokenPayload(email, type);
  return createSecureToken(payload);
}

/**
 * Blacklist a token (for one-time use)
 */
export function blacklistToken(token: string): void {
  tokenBlacklist.add(token);
  
  // Clean up old blacklisted tokens periodically
  if (tokenBlacklist.size > 10000) {
    // In production, implement proper cleanup with Redis TTL
    console.warn('Token blacklist is getting large, consider implementing Redis cleanup');
  }
}

/**
 * Enhanced email validation
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  // Basic length check
  if (email.length > 254) return false;
  
  // Enhanced regex for better validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) return false;
  
  // Check for common malicious patterns
  const suspiciousPatterns = [
    /\.{2,}/, // Multiple consecutive dots
    /^\.|\.$/, // Starts or ends with dot
    /@.*@/, // Multiple @ symbols
    /\+.*\+/, // Multiple + symbols (for email aliases)
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(email));
}

/**
 * Enhanced email sanitization
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '') // Remove all whitespace
    .substring(0, 254); // Enforce length limit
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string, maxLength: number = 100): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, maxLength);
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  
  // In production, implement proper CSRF validation with session storage
  return token === sessionToken;
}
