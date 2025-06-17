const Exercise = require('../models/exercise');

module.exports = {
  index,
  create,
  update,
  remove,
  show,
};


async function index(req, res) {
  try {
    const exercises = await Exercise.find({ user: req.user._id });
    res.json(exercises);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch exercises' });
  }
}

async function create(req, res) {
  try {
    const exercise = await Exercise.create({
      ...req.body,
      user: req.user._id,
    });
    res.json(exercise);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to create exercise' });
  }
}


async function update(req, res) {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(updatedExercise);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to update exercise' });
  }
}

async function remove(req, res) {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete exercise' });
  }
}

async function show(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Exercise not found' });
  }
}


