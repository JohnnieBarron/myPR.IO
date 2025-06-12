const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/user'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/user (INDEX action - get currently logged-in user's profile)
router.get('/', userCtrl.index);

// GET /api/user/:id
router.get('/:id', userCtrl.show);

// PUT /api/user/:id
router.put('/:id', userCtrl.update);

// PUT /api/user/:id/progress
router.put('/:id/progress', userCtrl.addProgress);



module.exports = router;