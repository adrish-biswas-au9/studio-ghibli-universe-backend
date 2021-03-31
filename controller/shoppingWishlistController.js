const express = require('express');
const router = express.Router();
const shoppingWishlist = require('../modal/shoppingWishlistModal');
const config = require('../config');
const mongoose = require('mongoose');


//parse data for post call
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/add', (req, res) => {

    const info = {
        "name": req.body.name,
        "shopping_id": req.body.shopping_id,
        "shopping_image": req.body.shopping_image,
        "email": req.body.email,
        "username": req.body.username,
        "date": new Date(Date.now())
    }

    shoppingWishlist.create(info, (err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });
        return res.status(200).send({ auth: true, message: "Data Registered!" })
        // res.redirect('/')
    });
})

router.get('/view', (req, res) => {

    shoppingWishlist.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})
router.delete('/delete/:id', (req, res) => {

    // let id = req.body._id;
    let id = req.params.id;
    console.log(req.params.id);
    shoppingWishlist.deleteOne(
        { _id: req.params.id },
        (err, data) => {
            if (err) res.status(400).send({ auth: true, message: err });
            return res.status(200).send({ auth: true, message: "Deleted" })
        })
})

module.exports = router;