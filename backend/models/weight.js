const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema(
  {
    weight: { type: Number, required: true },
    bodyfat: { type: Number },
    date: { type: Date, required: true },
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Weight', weightSchema);