const express = require('express');
const router = express.Router();
const film = require('../modal/filmsModal');
const config = require('../config');
const mongoose = require('mongoose');


//parse data for post call
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/view', (req, res) => {
    if (!req.session.user) {
        return res.status(400).send({auth:false,message:"login expired, login again!"});
    }
    film.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})

router.get('/view/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(400).send({auth:false,message:"login expired, login again!"});
    }
    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    film.find({id: req.params.id}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})


module.exports = router;