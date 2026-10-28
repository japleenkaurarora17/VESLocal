import rateLimit from 'express-rate-limit';

// Standard API limiter: 200 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, ip: false },
  keyGenerator: (req) => req.ip || req.socket?.remoteAddress || '127.0.0.1',
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Stricter limiter for authentication routes: 20 attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, ip: false },
  keyGenerator: (req) => req.ip || req.socket?.remoteAddress || '127.0.0.1',
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.'
  }
});
