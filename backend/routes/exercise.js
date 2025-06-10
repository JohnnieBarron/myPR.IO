const express = require('express');
const router = express.Router();
const exerciseCtrl = require('../controllers/exercise');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/exercise'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/exercise (INDEX action)
router.get('/', exerciseCtrl.index);
// POST /api/exercise (CREATE action)
router.post('/', exerciseCtrl.create);
// PUT /api/exercise/:_id
router.put('/:id', exerciseCtrl.update);
// DELETE /api/exercise/:_id
router.delete('/:id', exerciseCtrl.remove);
// SHOW /api/exercise/:_id
router.get('/:id', exerciseCtrl.show);

module.exports = router;