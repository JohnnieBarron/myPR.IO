const Exercise = require('../models/exercise');

module.exports = {
  index,
  create
};

async function index(req, res) {
  try {
    const exercise = await Exercise.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(exercise);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch exercise' });
  }
}

async function create(req, res) {
  try {
    const exercise = await Exercise.create(req.body);
    res.json(exercise);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to creat exercise' });
  }
}

