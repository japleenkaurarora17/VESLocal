import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  description: { type: String, trim: true }
}, { _id: true });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Official VES email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w.-]+@ves\.ac\.in$/, 'Must be a valid @ves.ac.in email address']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: [
      'Information Technology',
      'Computer Engineering',
      'Electronics & Telecommunication',
      'Artificial Intelligence & Data Science',
      'Instrumentation Engineering',
      'Master of Computer Applications'
    ]
  },
  year: {
    type: String,
    required: [true, 'Year of study is required'],
    enum: ['First Year', 'Second Year', 'Third Year', 'Fourth Year']
  },
  skills: {
    type: [String],
    default: []
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: 'VESIT student excited to collaborate on projects!'
  },
  businessId: {
    type: String,
    default: null
  },
  projects: {
    type: [projectSchema],
    default: []
  },
  connectCount: {
    type: Number,
    default: 0,
    min: 0
  },
  avatarUrl: {
    type: String,
    default: function() {
      return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(this.name || 'VESIT')}&backgroundColor=b6e3f4`;
    }
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  }
}, {
  timestamps: true
});

// Index for full-text search on name, skills, and bio
studentSchema.index({ name: 'text', skills: 'text', department: 'text' });

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
