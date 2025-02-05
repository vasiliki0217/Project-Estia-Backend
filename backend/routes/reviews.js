const express = require('express');
const router = express.Router();
const { getReviewsByBusinessId } = require('../controllers/reviewsController')

router.get('/businesses/:id/reviews', getReviewsByBusinessId);
// router.post('/reviews', addReview);
// router.delete('/review/:id', deleteReview)

module.exports = router;