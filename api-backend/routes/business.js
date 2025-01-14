const express = require('express');
const router = express.Router();
const { getBusiness, getBusinessById } = require('../controllers/businessController');


router.get('/', getBusiness);
router.get('/:id', getBusinessById);

module.exports = router;