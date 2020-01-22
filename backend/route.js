const express = require('express');
const router = express.Router();
const workers = require('./routers/workers');
const users = require('./routers/user');
const category = require('./routers/category');

router.use('/admin/workers', workers);
router.use('/admin/users', users);
router.use('/admin/category', category);
router.use('/admin/password/update',workers);
router.use('/worker/phone-number-update',workers);
router.use('/user/forgot/password',users);


module.exports = router;