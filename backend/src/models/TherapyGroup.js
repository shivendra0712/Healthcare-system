// models/TherapyGroup.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: Date,
  durationMinutes: Number,
  notes: String,
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {_id:false});

const therapyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // patient user accounts
  therapists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sessions: [sessionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TherapyGroup', therapyGroupSchema);
