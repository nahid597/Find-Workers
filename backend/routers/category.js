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
     console.log('req.query');

    Category.find(req.query)
        .exec(function(err, data) {
            console.log(data);
            if (err){
                res.status(400).send(err);
            }
            else res.status(200).send(data);
        });
        console.log('bala');
});
 

 module.exports = router;