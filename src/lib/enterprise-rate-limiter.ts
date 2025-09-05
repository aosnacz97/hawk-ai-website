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
    const userAgent = request.headers.get('user-agent') || '';
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

// Enterprise-grade rate limiters for high-traffic applications
export const enterpriseEmailRateLimiter = new EnterpriseRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 50, // 50 emails per 15 minutes per IP
  burstLimit: 10, // Allow 10 burst requests
  keyGenerator: (request) => {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const body = request.clone();
    return body.json().then((data: any) => `email:${ip}:${data.email}`).catch(() => `email:${ip}`);
  },
  tieredLimits: {
    premium: {
      windowMs: 15 * 60 * 1000,
      maxRequests: 100 // Premium users get 100 emails per 15 minutes
    },
    corporate: {
      windowMs: 15 * 60 * 1000,
      maxRequests: 200 // Corporate users get 200 emails per 15 minutes
    }
  }
});

export const enterpriseVerificationRateLimiter = new EnterpriseRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 100, // 100 verification attempts per hour per IP
  burstLimit: 20, // Allow 20 burst requests
  tieredLimits: {
    premium: {
      windowMs: 60 * 60 * 1000,
      maxRequests: 200 // Premium users get 200 verifications per hour
    },
    corporate: {
      windowMs: 60 * 60 * 1000,
      maxRequests: 500 // Corporate users get 500 verifications per hour
    }
  }
});

export const enterpriseMagicLinkRateLimiter = new EnterpriseRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 30, // 30 magic links per 15 minutes per IP
  burstLimit: 10, // Allow 10 burst requests
  tieredLimits: {
    premium: {
      windowMs: 15 * 60 * 1000,
      maxRequests: 60 // Premium users get 60 magic links per 15 minutes
    },
    corporate: {
      windowMs: 15 * 60 * 1000,
      maxRequests: 100 // Corporate users get 100 magic links per 15 minutes
    }
  }
});

// Global rate limiter for overall API protection
export const globalRateLimiter = new EnterpriseRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 1000, // 1000 requests per minute per IP
  burstLimit: 100, // Allow 100 burst requests
  keyGenerator: (request) => {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return `global:${ip}`;
  }
});
