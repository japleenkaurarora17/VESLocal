import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = null;

  // Check Bearer token in authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No authentication token provided'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_development_secret_veslocal_2026';
    const decoded = jwt.verify(token, secret);

    // Look up user (excluding password)
    let user = null;
    try {
      user = await User.findById(decoded.id).select('-password');
    } catch {
      // In demo/memory fallback mode if DB is not connected
    }

    // Attach user payload
    req.user = user || {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'student',
      name: decoded.name
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token'
    });
  }
};

export default protect;
