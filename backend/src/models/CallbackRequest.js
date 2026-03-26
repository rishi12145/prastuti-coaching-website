const mongoose = require('mongoose');

const CallbackRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    courseInterested: { type: String },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CallbackRequest', CallbackRequestSchema);

