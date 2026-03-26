const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    photoUrl: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', FacultySchema);

