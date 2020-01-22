const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');
const operation = require('../operation/operation');


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


 router.get('/get', function(req, res) {
    operation.findInf(Category, req.query, function(data,err) {
        if (err != true){
            res.status(200).json(data);
        }
        else{
            res.status(500).json(err);
        }
    });
});
 

 module.exports = router;