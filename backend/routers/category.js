const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');


router.post('/post', (req, res, next) => {
    
    const category = new Category({
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
    });
    category.save()
    .then(result => {
        res.status(200).json({
            message: 'category saved',
            result: result
        });
    })
    .catch(err => {
        res.status(201).json({
            error: err,
        });
    });
 });

 module.exports = router;