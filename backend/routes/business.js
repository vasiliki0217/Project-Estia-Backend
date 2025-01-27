const express = require('express');
const router = express.Router();
const { getBusiness, getBusinessById, getBusinessWithAddress, getBusinessWithFeatures, getBusinessWithReviews } = require('../controllers/businessController');


router.get('/', getBusiness);
router.get('/:id', getBusinessById);
router.get('/:id/address_details', getBusinessWithAddress);
router.get('/:id/business_features', getBusinessWithFeatures);
router.get('/:id/business_reviews', getBusinessWithReviews)

module.exports = router;