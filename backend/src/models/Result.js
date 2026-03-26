const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    course: { type: String }, // e.g. "JEE 2026"
    achievement: { type: String }, // e.g. "Qualified with 99.2 percentile"
    rankAchieved: { type: String }, // e.g. "AIR 89" / "Rank 142"
    stream: { type: String, enum: ['JEE', 'NEET', 'Boards', 'Foundation', 'Other'], default: 'Other' },
    isTopper: { type: Boolean, default: false },
    photoUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', ResultSchema);

