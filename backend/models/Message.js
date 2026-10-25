import mongoose from 'mongoose';

const messageItemSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  text: { type: String, required: true, maxlength: 1000 },
  time: { type: String, default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  createdAt: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
  participants: [{ type: String, required: true }],
  lastMessage: { type: String, default: '' },
  lastTimestamp: { type: String, default: 'Just now' },
  unread: { type: Boolean, default: false },
  conversation: [messageItemSchema]
}, {
  timestamps: true
});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;
