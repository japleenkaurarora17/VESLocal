import express from 'express';
import Opportunity from '../models/Opportunity.js';
import { protect } from '../middleware/authMiddleware.js';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

let memoryOpportunities = [
  {
    _id: "opp-1",
    id: "opp-1",
    title: "Need Video Editor for VESIT Symphony Teaser",
    description: "Looking for an enthusiastic editor proficient in Premiere Pro or DaVinci Resolve to edit a 60-second teaser reel for the Symphony festival.",
    authorId: "student-1",
    authorName: "Japleen Kaur",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Japleen&backgroundColor=f5d0a9",
    skillsNeeded: ["Video Editing", "Premiere Pro", "Motion Graphics"],
    type: "Event Collaboration",
    date: "2026-08-18",
    status: "Open",
    interestedStudents: ["student-2"]
  },
  {
    _id: "opp-2",
    id: "opp-2",
    title: "Full-Stack Dev for Smart Campus Attendance Hardware",
    description: "Sakshi is building an ESP32-based RFID reader. We need a React developer to build an intuitive dashboard showing live attendance counts.",
    authorId: "student-3",
    authorName: "Sakshi Patil",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sakshi&backgroundColor=ffd5dc",
    skillsNeeded: ["React", "REST API", "Tailwind CSS"],
    type: "Project Teammate",
    date: "2026-08-19",
    status: "Open",
    interestedStudents: ["student-4", "student-7"]
  }
];

// GET /api/opportunities
router.get('/', async (req, res, next) => {
  try {
    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const opps = await Opportunity.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: opps.length, data: opps });
    }
    return res.status(200).json({ success: true, count: memoryOpportunities.length, data: memoryOpportunities });
  } catch (err) {
    next(err);
  }
});

// POST /api/opportunities
router.post('/', protect, async (req, res, next) => {
  try {
    const { title, description, skillsNeeded, type } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const newOpp = await Opportunity.create({
        title,
        description,
        authorId: req.user.id || req.user._id,
        authorName: req.user.name,
        authorAvatar: req.user.avatarUrl,
        skillsNeeded: Array.isArray(skillsNeeded) ? skillsNeeded : [],
        type: type || 'Project Teammate'
      });
      return res.status(201).json({ success: true, data: newOpp });
    }

    const newId = `opp-${Date.now()}`;
    const newOpp = {
      _id: newId,
      id: newId,
      title,
      description,
      authorId: req.user.id || req.user._id,
      authorName: req.user.name,
      authorAvatar: req.user.avatarUrl,
      skillsNeeded: Array.isArray(skillsNeeded) ? skillsNeeded : [],
      type: type || 'Project Teammate',
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      interestedStudents: []
    };
    memoryOpportunities.unshift(newOpp);
    return res.status(201).json({ success: true, data: newOpp });
  } catch (err) {
    next(err);
  }
});

// POST /api/opportunities/:id/interest
router.post('/:id/interest', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = String(req.user.id || req.user._id);
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const opp = await Opportunity.findById(id);
      if (!opp) return res.status(404).json({ success: false, message: 'Opportunity not found' });
      const idx = opp.interestedStudents.indexOf(userId);
      if (idx > -1) {
        opp.interestedStudents.splice(idx, 1);
      } else {
        opp.interestedStudents.push(userId);
      }
      await opp.save();
      return res.status(200).json({ success: true, data: opp });
    }

    const opp = memoryOpportunities.find(o => o._id === id || o.id === id);
    if (!opp) return res.status(404).json({ success: false, message: 'Opportunity not found' });
    const idx = opp.interestedStudents.indexOf(userId);
    if (idx > -1) {
      opp.interestedStudents.splice(idx, 1);
    } else {
      opp.interestedStudents.push(userId);
    }
    return res.status(200).json({ success: true, data: opp });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/opportunities/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const opp = await Opportunity.findById(id);
      if (!opp) return res.status(404).json({ success: false, message: 'Opportunity not found' });
      if (req.user.role !== 'admin' && String(opp.authorId) !== String(req.user.id || req.user._id)) {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
      }
      await opp.deleteOne();
      return res.status(200).json({ success: true, message: 'Deleted successfully' });
    }

    const index = memoryOpportunities.findIndex(o => o._id === id || o.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Opportunity not found' });
    memoryOpportunities.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
