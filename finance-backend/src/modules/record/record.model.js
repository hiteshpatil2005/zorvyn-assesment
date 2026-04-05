const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: String,
  date: Date,
  note: String
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);