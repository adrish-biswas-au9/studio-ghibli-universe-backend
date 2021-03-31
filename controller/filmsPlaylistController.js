const express = require('express');
const router = express.Router();
const filmsPlaylist = require('../modal/filmsPlaylistModal');
const config = require('../config');
const mongoose = require('mongoose');


//parse data for post call
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/add', (req, res) => {

    const info = {
        "moviename": req.body.moviename,
        "movieid": req.body.movieid,
        "movieimage": req.body.movieimage,
        "email": req.body.email,
        "username": req.body.username,
        "date": new Date(Date.now())
    }

    filmsPlaylist.create(info, (err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });
        return res.status(200).send({ auth: true, message: "Data Registered!" })
        // res.redirect('/')
    });
})

router.get('/view', (req, res) => {

    filmsPlaylist.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})
router.delete('/delete/:id', (req, res) => {

    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    filmsPlaylist.deleteOne(
        { _id: req.params.id },
        (err, data) => {
            if (err) res.status(400).send({ auth: true, message: err });
            return res.status(200).send({ auth: true, message: "Deleted" })
        })
})

module.exports = router;