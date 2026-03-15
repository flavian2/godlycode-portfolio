const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  status: {
    type: String,
    enum: ['Lead', 'In Progress', 'Closed'],
    default: 'Lead'
  },
  clientInfo: {
    projectType: String,
    budget: String,
    timeline: String,
    description: String
  },
  assignedGods: [String],
  lastActiveAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

sessionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Session', sessionSchema);
