const express = require('express');
const router = express.Router();
const Worker = require('../models/worker.model');
const operation = require('../operation/operation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})

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

router.post('/get', function(req, res) {
    console.log("in " , req.body);
    Worker.findOne({_id: req.body._id})
    .then(user => {
        if(user) {
            ob = {
                'userId': user
            }
            res.status(200).send(ob);
        }
        else{
            res.status(500).send(err);
        }
    })
    .catch(err => {
        return res.status(404).json({
            message: 'user not found'
        });
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

        res.status(200).send(obj);

    })
    .catch(err => {
        return res.status(404).json({
            message: 'Auth failed!'
        });
    });

});

router.post('/signup',upload.single('file'), (req, res, next) => {
    console.log(req.body.Image);
    bcryptjs.hash(req.body.Password, 10)
    .then(hash => {
       const user = new Worker({
            Name: req.body.Name,
            Phone: req.body.Phone,
            Password: hash,
            Category: req.body.Category,
            Image: req.body.Image
        });
        console.log(req.file);
        user.save()
        .then(result => {
            res.status(200).send({
                complete: true,
                result: result
            });
        })
        .catch(err => {
            res.status(201).send({
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

// router.put('/update', function(req, res) {
//     console.log(req.body._id);
//     operation.updateData(Worker, { _id: req.body._id }, req.body, function(err) {
//         res.status(200).send(err);
//     });
// });

router.put('/update', function(req, res) {
    //console.log(req.body._id);

    Worker.findOneAndUpdate({ _id: req.body._id }, req.body, { upsert: true }, function(err) {
        if (err){
            console.log(err);
            res.status(400).send(err);
        }
        else {
            Worker.find({_id: req.body._id})
            .exec(function(err, data) {
                console.log(data);
                if (err){
                    console.log(err);
                    res.status(400).send(err);
                }
                else{
                    res.status(200).send(data);
                }
            });
        }
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
