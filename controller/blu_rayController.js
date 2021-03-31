const express = require('express');
const router = express.Router();
const blu_ray = require('../modal/blu_rayModal');
const config = require('../config');
const mongoose = require('mongoose');


//parse data for post call
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/view', (req, res) => {

    blu_ray.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})

router.get('/view/:id', (req, res) => {

    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    blu_ray.find({ id: req.params.id }, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})


module.exports = router;