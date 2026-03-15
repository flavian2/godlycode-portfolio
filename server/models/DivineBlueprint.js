const mongoose = require('mongoose');

const divineBlueprintSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  projectType: String,
  budget: String,
  timeline: String,
  techStack: [String],
  assignedGods: [String],
  briefingForOshun: String,
  briefingForOgun: String,
  briefingForEshu: String,
  rawBlueprint: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DivineBlueprint', divineBlueprintSchema);
