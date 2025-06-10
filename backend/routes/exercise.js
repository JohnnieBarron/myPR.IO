const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercise');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/posts'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/posts (INDEX action)
router.get('/', exerciseCtrl.index);
// POST /api/posts (CREATE action)
router.post('/', exerciseCtrl.create);

module.exports = router;