const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/usersController');

router.get('/', getUsers);
router.get('/:id', getUserById);
// router.post('/register', registerUser);
// router.post('/login', loginUser);

module.exports = router;