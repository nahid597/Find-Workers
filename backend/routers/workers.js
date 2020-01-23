const express = require('express');
const router = express.Router();
const Worker = require('../models/worker.model');
const operation = require('../operation/operation');

router.get('', function(req, res) {
    operation.findInf(Worker, req.query, function(err, data) {
        if (err != true)
            res.status(200).json(err);
        else
            res.status(200).json(data);
    });
});

router.post('', function(req, res) {

    var newWorker = new Worker();

    for (var key in req.body)
        newWorker[key] = req.body[key];

    operation.insertData(newWorker, function(err) {
        if (err != true)
            res.status(500).json(err);
        else
            res.status(200).json('Successfull');
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



module.exports = router;