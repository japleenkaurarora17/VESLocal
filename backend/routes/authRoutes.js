import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Student from '../models/Student.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { getDBStatus } from '../config/db.js';
import { getJwtSecret } from '../config/jwtConfig.js';

const router = express.Router();

// Helper to generate signed JWT
const generateToken = (payload) => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// In-memory demo users store fallback
// Passwords: both demo accounts use 'adminPassword123' for local testing only.
// These are NOT production credentials. Replace with real DB records in production.
let memoryUsers = [
  {
    _id: "user-1",
    id: "user-1",
    name: "Japleen Kaur",
    email: "japleen.kaur@ves.ac.in",
    passwordHash: "$2b$10$vecH3WefR.LXvkSdSPdDtuW3w4idNna1P47xOGlOZwVnkG76yBMbO",
    role: "student",
    department: "Information Technology",
    year: "Third Year"
  },
  {
    _id: "user-admin",
    id: "user-admin",
    name: "Admin Moderator",
    email: "admin.moderator@ves.ac.in",
    passwordHash: "$2b$10$vecH3WefR.LXvkSdSPdDtuW3w4idNna1P47xOGlOZwVnkG76yBMbO",
    role: "admin",
    department: "Information Technology",
    year: "Fourth Year"
  }
];

/**
 * @route   POST /api/auth/register
 * @desc    Register a new student user & generate JWT
 * @access  Public
 */
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { name, email, password, department, year } = req.body;

    // Server-side validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Full name is required' });
    }
    if (!email || !/^[\w.-]+@ves\.ac\.in$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid official @ves.ac.in email address' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const role = normalizedEmail.includes('admin') ? 'admin' : 'student';
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists with this VESIT email' });
      }

      // Create student profile
      const student = await Student.create({
        name: name.trim(),
        email: normalizedEmail,
        department: department || 'Information Technology',
        year: year || 'First Year',
        role
      });

      // Create user
      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password, // will be hashed by pre-save hook
        role,
        department: department || 'Information Technology',
        year: year || 'First Year',
        studentProfile: student._id
      });

      const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          year: user.year,
          avatarUrl: student.avatarUrl
        }
      });
    }

    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Registration disabled.'
      });
    }

    // Memory fallback (local testing/development only)
    const existing = memoryUsers.find(u => u.email === normalizedEmail);
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists with this VESIT email' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newId = `user-${Date.now()}`;
    const newUser = {
      _id: newId,
      id: newId,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      department: department || 'Information Technology',
      year: year || 'First Year'
    };
    memoryUsers.push(newUser);

    const token = generateToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful (in-memory demo)',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        year: newUser.year,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(newUser.name)}&backgroundColor=b6e3f4`
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & issue JWT
 * @access  Public
 */
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          year: user.year
        }
      });
    }

    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Authentication disabled.'
      });
    }

    // Memory fallback (local testing/development only)
    let user = memoryUsers.find(u => u.email === normalizedEmail);
    if (!user) {
      // In demo mode without DB: only allow pre-seeded demo accounts.
      // Do NOT auto-create sessions for unknown emails — that would bypass authentication entirely.
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password against stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful (in-memory demo)',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        year: user.year,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=b6e3f4`
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user profile
 * @access  Protected
 */
router.get('/me', protect, async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Log out user
 * @access  Public
 */
router.post('/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
});

export default router;
