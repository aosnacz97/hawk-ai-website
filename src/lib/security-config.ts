// Security configuration for the authentication system

export const SECURITY_CONFIG = {
  // Token configuration
  TOKEN: {
    LENGTH: 32, // 256-bit tokens
    VERIFICATION_EXPIRY_HOURS: 48,
    MAGIC_LINK_EXPIRY_HOURS: 24,
    VERSION: '1.0'
  },

  // Rate limiting configuration aligned with Supabase limits
  RATE_LIMITS: {
    EMAIL_SEND: {
      windowMs: 60 * 60 * 1000, // 1 hour (matching Supabase)
      maxRequests: 32767 // 32,767 emails per hour per IP (matching Supabase)
    },
    VERIFICATION: {
      windowMs: 5 * 60 * 1000, // 5 minutes (matching Supabase token verification)
      maxRequests: 10000 // 10,000 verification attempts per 5 minutes per IP (matching Supabase)
    },
    MAGIC_LINK: {
      windowMs: 5 * 60 * 1000, // 5 minutes (matching Supabase token verification)
      maxRequests: 10000 // 10,000 magic links per 5 minutes per IP (matching Supabase)
    }
  },

  // Input validation
  VALIDATION: {
    EMAIL_MAX_LENGTH: 254,
    NAME_MAX_LENGTH: 50,
    TOKEN_MAX_LENGTH: 1000,
    TOKEN_MIN_LENGTH: 50
  },

  // Security headers
  HEADERS: {
    CSP: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
    HSTS: 'max-age=31536000; includeSubDomains',
    X_FRAME_OPTIONS: 'DENY',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    REFERRER_POLICY: 'strict-origin-when-cross-origin'
  },

  // Suspicious patterns to monitor
  SUSPICIOUS_PATTERNS: {
    EMAIL_DOMAINS: [
      'tempmail.com',
      '10minutemail.com',
      'guerrillamail.com',
      'mailinator.com',
      'throwaway.email'
    ],
    USER_AGENTS: [
      'bot',
      'crawler',
      'spider',
      'scraper'
    ]
  },

  // Logging configuration
  LOGGING: {
    ENABLE_SECURITY_LOGS: true,
    LOG_LEVEL: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    SENSITIVE_FIELDS: ['password', 'token', 'secret', 'key']
  }
};

// Environment validation
export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required environment variables
  if (!process.env.RESEND_API_KEY) {
    errors.push('RESEND_API_KEY is required');
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    errors.push('NEXT_PUBLIC_APP_URL is required');
  }

  // Check for secure token secret in production
  if (process.env.NODE_ENV === 'production' && !process.env.TOKEN_SECRET) {
    errors.push('TOKEN_SECRET is required in production');
  }

  // Validate URL format
  if (process.env.NEXT_PUBLIC_APP_URL) {
    try {
      new URL(process.env.NEXT_PUBLIC_APP_URL);
    } catch {
      errors.push('NEXT_PUBLIC_APP_URL must be a valid URL');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Security headers middleware
export function getSecurityHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': SECURITY_CONFIG.HEADERS.CSP,
    'Strict-Transport-Security': SECURITY_CONFIG.HEADERS.HSTS,
    'X-Frame-Options': SECURITY_CONFIG.HEADERS.X_FRAME_OPTIONS,
    'X-Content-Type-Options': SECURITY_CONFIG.HEADERS.X_CONTENT_TYPE_OPTIONS,
    'Referrer-Policy': SECURITY_CONFIG.HEADERS.REFERRER_POLICY,
    'X-XSS-Protection': '1; mode=block'
  };
}

// Input sanitization helpers
export function sanitizeForLogging(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };
  
  SECURITY_CONFIG.LOGGING.SENSITIVE_FIELDS.forEach(field => {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  });

  return sanitized;
}

// Check if user agent is suspicious
export function isSuspiciousUserAgent(userAgent: string): boolean {
  if (!userAgent) return false;
  
  const lowerUA = userAgent.toLowerCase();
  return SECURITY_CONFIG.SUSPICIOUS_PATTERNS.USER_AGENTS.some(pattern => 
    lowerUA.includes(pattern)
  );
}

// Validate request origin
export function isValidOrigin(origin: string, allowedOrigins: string[]): boolean {
  if (!origin) return false;
  
  try {
    const originUrl = new URL(origin);
    return allowedOrigins.some(allowed => {
      try {
        const allowedUrl = new URL(allowed);
        return originUrl.hostname === allowedUrl.hostname;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}
