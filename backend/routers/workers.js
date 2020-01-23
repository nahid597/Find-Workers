const express = require('express');
const router = express.Router();
const Worker = require('../models/worker.model');
const operation = require('../operation/operation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('', function(req, res) {
    operation.findInf(Worker, req.query, function(data,err) {
        if (err != true){
            res.status(200).json(data);
        }
        else{
            res.status(500).json(err);
        }
    });
});



router.post('/login', (req, res , next) => {

    let fetchData;
   
    Worker.findOne({Phone: req.body.Phone})
    .then(user => {
        if(!user)
        {
            return res.status(404).json({
                message: 'Auth failed!'
            });
        }

        fetchData = user;

       return bcryptjs.compare(req.body.Password, fetchData.Password);
    })
    .then(result => {
        if(!result)
        {
            return res.status(404).json({
                message: 'Auth failed!'
            });
        }

       const token = jwt.sign({Phone:req.body.Phone, userId: fetchData._id}, "secret_should_more_difficult" , {
            expiresIn: '1h'
        });

        obj = {
            'token': token,
            'expiresIn': 3600,
            'userId': fetchData
        }

        res.send(obj);

    })
    .catch(err => {
        return res.status(404).json({
            message: 'Auth failed!'
        });
    });

});

router.post('/signup', (req, res, next) => {
    
    bcryptjs.hash(req.body.Password, 10)
    .then(hash => {
       const user = new Worker({
            Name: req.body.Name,
            Phone: req.body.Phone,
            Password: hash,
            Category: req.body.Category,
            Image: req.body.Image
        });
        user.save()
        .then(result => {
            res.status(200).json({
                message: 'user created',
                result: result
            });
        })
        .catch(err => {
            res.status(201).json({
                error: err,
            });
        });
    });
    
 });

router.delete('', function(req, res) {
    operation.deleteData(Worker, req.query, function(err) {
        if (err != true)
            res.status(500).json(err);
        else
            res.status(200).json('Successfull');
    });
});

router.put('', function(req, res) {
    operation.updateData(Worker, { _id: req.body._id }, req.body, function(err) {
        if (err != true)
            res.status(500).json(err);
        else
            res.status(200).json('Successfull');
    });
});

router.put('/password/update',function(req,res){
    
    operation.updateData(Worker,{Phone : req.body.Phone_number},{Password : req.body.Newpass},function(err)
    {
        if(err != true)
         res.status(500).json(err);
         else 
         res.status(200).json('password update successfully');
    });
});

router.put('/phone-number/update',function(req,res){
   
    operation.updateData(Worker,{Phone : req.body.OldNumber},{Phone : req.body.NewNumber},(err) =>{
        if(err != true)
        res.status(500).json(err);
        else res.status(200).json('phone number update successfully!!!');
    });
});



module.exports = router;