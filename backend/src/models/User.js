const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false }, // admin may use password, students rely on OTP
    role: {
      type: String,
      enum: ['admin', 'student'],
      default: 'student',
    },
    status: {
      type: String,
      enum: ['registered', 'admitted'],
      default: 'registered',
    },
    stream: { type: String },
    courseInterested: { type: String },
    classOrExam: { type: String },
    parentMobile: { type: String },
    email: { type: String },
    address: { type: String },
    rollNumber: { type: String },
    batch: { type: String },
    admissionDate: { type: Date },
    feeStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid'],
      default: 'pending',
    },
    loginEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

