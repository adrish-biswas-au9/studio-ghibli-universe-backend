const express = require('express');
const router = express.Router();
const order = require('../modal/orderModal');
const config = require('../config');
const mongoose = require('mongoose');


//parse data for post call
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.post('/register', (req, res) => {
    const info = {
        "email": req.body.email,
        "status": 'pending',
        "date": new Date().toDateString()
    }

    order.create(info, (err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });
        return res.status(200).send({ auth: true, message: "Data Registered!" })
        // res.redirect('/')
    });
})

router.get('/history', (req, res) => {
    
    order.find({staus:"pending"}).toArray((err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });;
        return res.status(200).send(data);
    })
})


module.exports = router;