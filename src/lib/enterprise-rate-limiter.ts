// Enterprise-grade rate limiter for high-traffic applications
interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastRequest: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface EnterpriseRateLimitConfig {
  windowMs: number;
  maxRequests: number;
  burstLimit?: number; // Allow burst requests
  keyGenerator?: (request: Request) => string;
  tieredLimits?: {
    [tier: string]: {
      windowMs: number;
      maxRequests: number;
    };
  };
}

export class EnterpriseRateLimiter {
  private config: EnterpriseRateLimitConfig;

  constructor(config: EnterpriseRateLimitConfig) {
    this.config = config;
  }

  private getKey(request: Request): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(request);
    }

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

  private detectTier(request: Request): string {
    // Detect user tier based on headers, IP, or other factors
    const _userAgent = request.headers.get('user-agent') || '';
    const forwarded = request.headers.get('x-forwarded-for') || '';
    
    // Premium users (you can implement your own logic)
    if (request.headers.get('x-premium-user') === 'true') {
      return 'premium';
    }
    
    // Corporate IPs (you can implement IP whitelist)
    if (forwarded.includes('192.168.') || forwarded.includes('10.')) {
      return 'corporate';
    }
    
    // Default tier
    return 'standard';
  }

  async checkLimit(request: Request): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
    tier?: string;
    burstAllowed?: boolean;
  }> {
    this.cleanup();
    
    const key = this.getKey(request);
    const now = Date.now();
    const tier = this.detectTier(request);
    
    // Use tiered limits if configured
    let effectiveConfig = this.config;
    if (this.config.tieredLimits && this.config.tieredLimits[tier]) {
      effectiveConfig = {
        ...this.config,
        ...this.config.tieredLimits[tier]
      };
    }

    const entry = rateLimitStore.get(key);
    
    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + effectiveConfig.windowMs,
        lastRequest: now
      };
      rateLimitStore.set(key, newEntry);
      
      return {
        allowed: true,
        remaining: effectiveConfig.maxRequests - 1,
        resetTime: newEntry.resetTime,
        tier
      };
    }

    // Check burst limit
    const timeSinceLastRequest = now - entry.lastRequest;
    const burstAllowed = this.config.burstLimit ? 
      timeSinceLastRequest < 1000 : // Allow burst if less than 1 second since last request
      false;

    if (entry.count >= effectiveConfig.maxRequests && !burstAllowed) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        tier
      };
    }

    // Increment counter
    entry.count++;
    entry.lastRequest = now;
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: effectiveConfig.maxRequests - entry.count,
      resetTime: entry.resetTime,
      tier,
      burstAllowed
    };
  }
}

// Enterprise-grade rate limiters aligned with Supabase limits
export const enterpriseEmailRateLimiter = new EnterpriseRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour (matching Supabase email rate limit)
  maxRequests: 32767, // 32,767 emails per hour per IP (matching Supabase)
  burstLimit: 1000, // Allow 1000 burst requests
  keyGenerator: (request) => {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const body = request.clone();
    return body.json().then((data: Record<string, unknown>) => `email:${ip}:${data.email}`).catch(() => `email:${ip}`);
  },
  tieredLimits: {
    premium: {
      windowMs: 60 * 60 * 1000,
      maxRequests: 32767 // Premium users get full email limit
    },
    corporate: {
      windowMs: 60 * 60 * 1000,
      maxRequests: 32767 // Corporate users get full email limit
    }
  }
});

export const enterpriseVerificationRateLimiter = new EnterpriseRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes (matching Supabase token verification)
  maxRequests: 10000, // 10,000 verification attempts per 5 minutes per IP (matching Supabase)
  burstLimit: 1000, // Allow 1000 burst requests
  tieredLimits: {
    premium: {
      windowMs: 5 * 60 * 1000,
      maxRequests: 10000 // Premium users get full verification limit
    },
    corporate: {
      windowMs: 5 * 60 * 1000,
      maxRequests: 10000 // Corporate users get full verification limit
    }
  }
});

export const enterpriseMagicLinkRateLimiter = new EnterpriseRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes (matching Supabase token verification)
  maxRequests: 10000, // 10,000 magic links per 5 minutes per IP (matching Supabase)
  burstLimit: 1000, // Allow 1000 burst requests
  tieredLimits: {
    premium: {
      windowMs: 5 * 60 * 1000,
      maxRequests: 10000 // Premium users get full magic link limit
    },
    corporate: {
      windowMs: 5 * 60 * 1000,
      maxRequests: 10000 // Corporate users get full magic link limit
    }
  }
});

// Global rate limiter for overall API protection (aligned with sign up/sign in limits)
export const globalRateLimiter = new EnterpriseRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes (matching Supabase sign up/sign in)
  maxRequests: 32767, // 32,767 requests per 5 minutes per IP (matching Supabase)
  burstLimit: 1000, // Allow 1000 burst requests
  keyGenerator: (request) => {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return `global:${ip}`;
  }
});
