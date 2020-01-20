const express = require('express');
const router = express.Router();
const workers = require('./routers/workers');
const users = require('./routers/user');
const category = require('./routers/category');

router.use('/admin/workers', workers);
router.use('/admin/users', users);
router.use('/admin/category', category);

module.exports = router;