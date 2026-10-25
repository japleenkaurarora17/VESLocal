import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

let memoryMessages = [
  {
    id: "chat-1",
    studentId: "student-2",
    studentName: "Rahul Mehta",
    avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul&backgroundColor=b6e3f4",
    department: "Computer Engineering",
    lastMessage: "Hey Japleen! Saw your post for the Symphony teaser reel.",
    lastTimestamp: "10:30 AM",
    unread: false,
    conversation: [
      { id: "m1", senderId: "student-2", senderName: "Rahul Mehta", text: "Hey Japleen! Saw your post for the Symphony teaser reel.", time: "10:30 AM" },
      { id: "m2", senderId: "student-1", senderName: "Japleen Kaur", text: "Hi Rahul! Yes, we need someone with DaVinci Resolve or Premiere Pro expertise.", time: "10:32 AM" },
      { id: "m3", senderId: "student-2", senderName: "Rahul Mehta", text: "I'd love to help! Can we catch up in the college cafeteria during the 1 PM break?", time: "10:35 AM" }
    ]
  }
];

// GET /api/messages
router.get('/', protect, (req, res) => {
  res.status(200).json({ success: true, data: memoryMessages });
});

// POST /api/messages/:chatId
router.post('/:chatId', protect, (req, res) => {
  const { chatId } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ success: false, message: 'Message text is required' });
  }

  const chat = memoryMessages.find(c => c.id === chatId);
  if (!chat) {
    return res.status(404).json({ success: false, message: 'Chat thread not found' });
  }

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const newMsg = {
    id: `m-${Date.now()}`,
    senderId: String(req.user.id || req.user._id),
    senderName: req.user.name,
    text: text.trim(),
    time
  };

  chat.conversation.push(newMsg);
  chat.lastMessage = newMsg.text;
  chat.lastTimestamp = time;

  res.status(201).json({ success: true, data: newMsg });
});

export default router;
