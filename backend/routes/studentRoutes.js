import express from 'express';
import Student from '../models/Student.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

// In-memory demo store fallback when MongoDB is not connected
let memoryStudents = [
  {
    _id: "student-1",
    id: "student-1",
    name: "Japleen Kaur",
    email: "japleen.kaur@ves.ac.in",
    department: "Information Technology",
    year: "Third Year",
    skills: ["UI/UX", "React", "Product Management", "Figma", "Graphic Design"],
    bio: "IT undergrad passionate about building user-centered products. Freelance designer, hackathon enthusiast, and coffee lover. Let's build something cool!",
    businessId: "biz-1",
    projects: [
      { id: "p1", name: "VESIT Portal Redesign", role: "Lead UI Designer", description: "Revamped portal layout." }
    ],
    connectCount: 42,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Japleen&backgroundColor=f5d0a9",
    role: "student"
  },
  {
    _id: "student-2",
    id: "student-2",
    name: "Rahul Mehta",
    email: "rahul.mehta@ves.ac.in",
    department: "Computer Engineering",
    year: "Fourth Year",
    skills: ["Video Editing", "After Effects", "DaVinci Resolve", "Cinematography"],
    bio: "Passionate filmmaker and editor. If you need a cinematic reel for your startup, event, or campaign, hit me up!",
    businessId: "biz-2",
    projects: [
      { id: "p3", name: "Vistara Film Festival Main Video", role: "Director & Editor", description: "College festival teaser." }
    ],
    connectCount: 89,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul&backgroundColor=b6e3f4",
    role: "student"
  },
  {
    _id: "student-3",
    id: "student-3",
    name: "Sakshi Patil",
    email: "sakshi.patil@ves.ac.in",
    department: "Electronics & Telecommunication",
    year: "Second Year",
    skills: ["IoT", "Embedded Systems", "Python", "Arduino", "C++"],
    bio: "Always tinkering with sensors and microcontrollers. Working on automated home systems.",
    businessId: null,
    projects: [],
    connectCount: 24,
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sakshi&backgroundColor=ffd5dc",
    role: "student"
  }
];

/**
 * @route   GET /api/students
 * @desc    Get all students with optional search/filter
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { department, skill, search } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      let query = {};
      if (department) query.department = department;
      if (skill) query.skills = { $in: [new RegExp(skill, 'i')] };
      if (search) {
        query.$or = [
          { name: new RegExp(search, 'i') },
          { email: new RegExp(search, 'i') },
          { skills: new RegExp(search, 'i') }
        ];
      }

      const students = await Student.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: students.length,
        source: 'database',
        data: students
      });
    }

    // Memory fallback
    let filtered = [...memoryStudents];
    if (department) {
      filtered = filtered.filter(s => s.department === department);
    }
    if (skill) {
      filtered = filtered.filter(s => s.skills.some(sk => sk.toLowerCase().includes(skill.toLowerCase())));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.skills.some(sk => sk.toLowerCase().includes(q))
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      source: 'in-memory-fallback',
      data: filtered
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/students/:id
 * @desc    Get single student profile by ID
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: `Student not found with id ${id}`
        });
      }
      return res.status(200).json({
        success: true,
        source: 'database',
        data: student
      });
    }

    // Memory fallback
    const student = memoryStudents.find(s => s._id === id || s.id === id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      source: 'in-memory-fallback',
      data: student
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /api/students
 * @desc    Create a new student profile
 * @access  Public (or protected during registration)
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, department, year, skills, bio, businessId, projects } = req.body;

    // Server-side input validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !/^[\w.-]+@ves\.ac\.in$/.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid @ves.ac.in official email is required' });
    }
    if (!department) {
      return res.status(400).json({ success: false, message: 'Department is required' });
    }
    if (!year) {
      return res.status(400).json({ success: false, message: 'Year of study is required' });
    }

    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const existing = await Student.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(409).json({ success: false, message: 'Student with this email already exists' });
      }

      const newStudent = await Student.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        department,
        year,
        skills: Array.isArray(skills) ? skills : [],
        bio: bio || 'VESIT undergraduate student.',
        businessId: businessId || null,
        projects: Array.isArray(projects) ? projects : []
      });

      return res.status(201).json({
        success: true,
        message: 'Student profile created successfully',
        source: 'database',
        data: newStudent
      });
    }

    // Memory fallback
    const existing = memoryStudents.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ success: false, message: 'Student with this email already exists' });
    }

    const newId = `student-${Date.now()}`;
    const newStudent = {
      _id: newId,
      id: newId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      department,
      year,
      skills: Array.isArray(skills) ? skills : [],
      bio: bio || 'VESIT undergraduate student.',
      businessId: businessId || null,
      projects: Array.isArray(projects) ? projects : [],
      connectCount: 0,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4`,
      role: 'student',
      createdAt: new Date().toISOString()
    };
    memoryStudents.push(newStudent);

    return res.status(201).json({
      success: true,
      message: 'Student profile created successfully',
      source: 'in-memory-fallback',
      data: newStudent
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PUT /api/students/:id
 * @desc    Update student profile
 * @access  Protected (Student owner or Admin)
 */
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const dbStatus = getDBStatus();

    // Prevent modifying email or role unless admin
    if (updates.role && req.user.role !== 'admin') {
      delete updates.role;
    }

    if (dbStatus.connected) {
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ success: false, message: `Student not found with id ${id}` });
      }

      // Check ownership
      if (req.user.role !== 'admin' && student.email !== req.user.email) {
        return res.status(403).json({ success: false, message: 'Not authorized to update another student profile' });
      }

      const updated = await Student.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
      });

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        source: 'database',
        data: updated
      });
    }

    // Memory fallback
    const index = memoryStudents.findIndex(s => s._id === id || s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Student not found with id ${id}` });
    }

    memoryStudents[index] = { ...memoryStudents[index], ...updates };
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      source: 'in-memory-fallback',
      data: memoryStudents[index]
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student profile
 * @access  Protected (Admin only)
 */
router.delete('/:id', protect, requireRole('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        return res.status(404).json({ success: false, message: `Student not found with id ${id}` });
      }
      return res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
        source: 'database',
        data: { id }
      });
    }

    // Memory fallback
    const index = memoryStudents.findIndex(s => s._id === id || s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: `Student not found with id ${id}` });
    }
    const removed = memoryStudents.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      source: 'in-memory-fallback',
      data: removed[0]
    });
  } catch (err) {
    next(err);
  }
});

export default router;
