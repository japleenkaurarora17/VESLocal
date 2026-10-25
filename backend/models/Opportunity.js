import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Opportunity title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  authorId: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  authorAvatar: {
    type: String
  },
  skillsNeeded: {
    type: [String],
    default: []
  },
  type: {
    type: String,
    enum: ['Event Collaboration', 'Project Teammate', 'Startup Co-founder', 'Freelance Gig', 'Study Group'],
    default: 'Project Teammate'
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  interestedStudents: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;
