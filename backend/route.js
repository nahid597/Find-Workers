const express = require('express');
const router = express.Router();
const workers = require('./routers/workers');

router.use('/admin/workers', workers);

module.exports = router;