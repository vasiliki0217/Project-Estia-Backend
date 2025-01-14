const express = require('express');
const router = express.Router();
const {
    getReviews,
    getReviewsByBusinessId,
    addReview,
    deleteReview
} = require('../controllers/reviewsController')

router.get('/', getReviews);
router.get('/businesses/:id/reviews', getReviewsByBusinessId);
router.post('/reviews', addReview);
router.delete('/review/:id', deleteReview)

module.exports = router;