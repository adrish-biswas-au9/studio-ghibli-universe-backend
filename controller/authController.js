const express = require('express');
const router = express.Router();
const user = require('../modal/userModal');
const config = require('../config');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//parse data for post call
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
//router.use(cors())

router.get('/', (req, res) => {
    return res.status(200).send("Health Ok")
})

//register
router.post('/register', (req, res) => {
    const info = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "role": req.body.role ? req.body.role : 'user',
        "isActive": Boolean(req.body.isActive) ? Boolean(req.body.isActive) : true
    }
    user.findOne({email:req.body.email},(err, data) => {
        if (err) throw err;
        if(data) return res.status(400).send("Email already taken! Use another email!")
        user.create(info, (err, data) => {
            if (err) throw err;
            return res.status(200).send("Data Registered.")
            // res.redirect('/')
        });
    })
    
});

//get all users
router.get('/users', (req, res) => {
    let query = {isActive: true }
    //console.log("session>>>",req.session.user)
    // if (!req.session.user) {
    //     return res.send("login expired, login again!");
    // }
    // if (req.session.user.role!=="admin") {
    //     return res.send("You are not allowed here!");
    // }
    // else if (req.query.role) {
    //     query = { role: req.query.role, isActive: true }
    // }
    // else {
    //     query = { isActive: true }
    // }
    
    user.find(query).toArray((err, data) => {
        if (err) throw err;
        return res.status(200).send(data);
    })
})

//login
router.get('/login', (req, res) => {
    const info = {
        "isActive": Boolean(req.body.isActive) ? Boolean(req.body.isActive) : true,
        "email": req.body.email,
        "password": req.body.password
    }
    user.findOne(info, (err, data) => {
        if (err || !data) {
            return res.status(400).send("Inavlid credentials! Please try again");
        }
        //req.session.user=data;
        return res.status(200).send(data)
        // res.redirect('/')
    });
});

//logout
router.get('/logout', (req, res) => {
    //req.session.user=null;
    return res.status(200).send("Logout successful!")
})


//Hard delete user
router.delete('/deleteUser', (req, res) => {
    let id = req.body._id;
    user.remove(
        { _id: mongoose.ObjectId(id) },
        (err, data) => {
            if (err) throw err;
            return res.status(200).send("Data deleted")
        })
})

module.exports = router;