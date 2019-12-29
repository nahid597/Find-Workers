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
            console.log(data);
            console.log('inner2222 ' + err);
        }
        else{
            res.status(500).json(err);
            console.log('inener ' + data);
        }
    });
});



router.post('/login', (req, res , next) => {

    let fetchData;

    console.log('faltu data' + req.body.Phone);
   
    Worker.findOne({Phone: req.body.Phone})
    .then(user => {
        console.log('baler user ' + user);
        if(!user)
        {
            console.log('user not found');
            return res.status(404).json({
                message: 'Auth failed!'
            });
        }

        fetchData = user;
        console.log(typeof (req.body.Password) + ' ' + typeof(fetchData.Password));

       return bcryptjs.compare(req.body.Password, fetchData.Password);
    })
    .then(result => {
        if(!result)
        {
            console.log('user result not found ' + result);
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
            'userId': fetchData._id
        }

        console.log(JSON.stringify(obj));
        obb = JSON.stringify(obj);
        obbb = JSON.parse(obb);
        console.log('bal testing ' + obbb.token);
       // cosole.log('parsed data ' + obbb);
       console.log('token ' + token);
    //    res.setHeader('Content-type', 'application/json');
    //    res.writeHead(200);
    //    res.write(obj);
    //    res.end(obj);
    // return obj;
       res.status(200).json(JSON.stringify(obbb));
    // res.writeHead(200,{'Content-Type':'text/plain'});
    // res.write(token);
    // res.end();

    // res.setHeader('Content-type','application/json');
    // res.end(obb);

    console.log('in response object ' + ob.expiresIn);

    })
    .catch(err => {
        //console.log(err);
        console.log('user error found');
        return res.status(404).json({
            message: 'Auth failed!'
        });
    });

});



router.post('/signup', (req, res, next) => {
    //console.log("email= " + req.body.email);
    //console.log("password= " + req.body.password);
    console.log('in signup ' + req.body.Phone);
    
    bcryptjs.hash(req.body.Password, 10)
    .then(hash => {
       const user = new Worker({
            Name: req.body.Name,
            Phone: req.body.Phone,
            Password: hash,
            Category: req.body.Category
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



// router.post('', function(req, res) {

//     var newWorker = new Worker();
   
//     for (var key in req.body)
//         newWorker[key] = req.body[key];

//     operation.insertData(newWorker, function(err) {
//         console.log('okk');
//         if (err != true)
//             res.status(500).json(err);
//         else
//             res.status(200).json('Successfull');
//     });
// });

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



module.exports = router;