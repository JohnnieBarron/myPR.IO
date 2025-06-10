const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    duration: { type: Number },
    distance: { type: Number },
    weight: { type: Number },
    reps: { type: Number },
    sets: { type: Number },
});

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: ['cardio', 'resistance'],
    },
    progress: [progressSchema],
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);