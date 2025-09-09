// Simple in-memory rate limiter (use Redis in production)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyGenerator?: (request: Request) => string; // Custom key generator
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  private getKey(request: Request): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(request);
    }

    // Default: IP-based rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return `rate_limit:${ip}`;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  async checkLimit(request: Request): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    this.cleanup();
    
    const key = this.getKey(request);
    const now = Date.now();
    const _windowStart = now - this.config.windowMs;

    const entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + this.config.windowMs
      };
      rateLimitStore.set(key, newEntry);
      
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: newEntry.resetTime
      };
    }

    if (entry.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000)
      };
    }

    // Increment counter
    entry.count++;
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }
}

// Pre-configured rate limiters for production scale
export const emailRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 20, // 20 emails per 15 minutes per IP
  keyGenerator: (request) => {
    // Rate limit by IP + email combination
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const body = request.clone();
    return body.json().then((data: Record<string, unknown>) => `email:${ip}:${data.email}`).catch(() => `email:${ip}`);
  }
});

export const verificationRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 50, // 50 verification attempts per hour per IP
});

export const magicLinkRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 15, // 15 magic links per 15 minutes per IP
});
