const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  price: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Stock', stockSchema);
