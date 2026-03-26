const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    classOrExam: { type: String },
    duration: { type: String }, // e.g. "12 months"
    fee: { type: Number }, // e.g. 45000
    imageUrl: { type: String },
    isTrending: { type: Boolean, default: false },
    newBatchTag: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);

