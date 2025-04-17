const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  symbol:      { type: String, required: true, index: true },
  threshold:   { type: Number, required: true },
  limit:       { type: Number, required: true },
  windowMs:    { type: Number, required: true },
  sentTimestamps: [Date],
  missedCount: { type: Number, default: 0 },
  windowEnd:   { type: Date }
});

module.exports = mongoose.model('Alert', alertSchema);
