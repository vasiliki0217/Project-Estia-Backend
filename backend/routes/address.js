const express = require('express');
const router = express.Router();
const { getAddress, getAddressById } = require('../controllers/addressController');


router.get('/', getAddress);
router.get('/:id', getAddressById);

module.exports = router;