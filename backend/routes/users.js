const express = require('express');
const router = express.Router();
const { getUsers, getUserById, addReview } = require('../controllers/usersController');

router.get('/', getUsers); //testing
router.get('/:id', getUserById); //testing
router.post('/:id_users/add_review/:id_business', addReview);
// router.delete('/review', deleteReview) (to do)

module.exports = router;