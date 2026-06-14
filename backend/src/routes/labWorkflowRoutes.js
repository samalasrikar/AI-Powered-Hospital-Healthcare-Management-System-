const express = require('express');
const { processLabWorkflow } = require('../controllers/labWorkflowController');

const router = express.Router();

router.post('/', processLabWorkflow);

module.exports = router;