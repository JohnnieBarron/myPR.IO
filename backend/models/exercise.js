const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: ['cardio', 'resistance'],
    },
    duration: { type: Number },
    distance: { type: Number },
    weight: { type: Number },
    reps: { type: Number },
    sets: { type: Number },
    notes: { type: String}
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);