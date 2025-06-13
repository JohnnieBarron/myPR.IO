const Weight = require('../models/weight'); 

module.exports = {
  create,
  indexByUser,
};

async function create(req, res) {
  try {
    const weight = await Weight.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(weight);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to add weight entry' });
  }
}

async function indexByUser(req, res) {
  try {
    const weights = await Weight.find({ user: req.user._id }).sort({ date: -1 });
    res.json(weights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch weight entries' });
  }
}
