const express = require('express');
const { searchRecords } = require('../controllers/emrSearchController');

const router = express.Router();

router.get('/', searchRecords);

module.exports = router;