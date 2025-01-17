const express = require('express');
const router = express.Router();
const { getBusiness, getBusinessById, getBusinessWithAddress } = require('../controllers/businessController');


router.get('/', getBusiness);
router.get('/:id', getBusinessById);
router.get('/:id/address_details', getBusinessWithAddress);

module.exports = router;