const express = require('express');
const router = express.Router();
const { getUsers, getUserById, addReview } = require('../controllers/usersController');

router.get('/', getUsers); //testing
router.get('/:id', getUserById); //testing
router.post('/:user_id/add_review/:business_id', addReview);
// router.delete('/review', deleteReview) (to do)

module.exports = router;