const express = require('express');
const router = express.Router();
const workers = require('./routers/workers');
const users = require('./routers/user');
const category = require('./routers/category');
const phoneValidation = require('./routers/phonevalidation');

router.use('/admin/workers', workers);
router.use('/admin/users', users);
router.use('/admin/category', category);
router.use('/user',users);
router.use('/worker',workers);
router.use('/validate',phoneValidation);

module.exports = router;