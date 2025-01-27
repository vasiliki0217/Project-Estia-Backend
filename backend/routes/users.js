const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/usersController');

router.get('/', getUsers);
router.get('/:id', getUserById);
// router.post('/reviews', addReview);
// router.delete('/review/:id', deleteReview)

module.exports = router;