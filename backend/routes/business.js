const express = require('express');
const router = express.Router();
const { getBusiness, getBusinessById, getBusinessAddressId } = require('../controllers/businessController');


router.get('/', getBusiness);
router.get('/:id', getBusinessById);
router.get('/:id/id_Address', getBusinessAddressId);

module.exports = router;