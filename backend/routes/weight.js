const express = require('express');
const router = express.Router();
const weightCtrl = require('../controllers/weight');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.use(ensureLoggedIn);

// POST /api/weight - Add a weight entry
router.post('/', weightCtrl.create);

// GET /api/weight - Get all weight entries for current user
router.get('/', weightCtrl.indexByUser);

module.exports = router;
