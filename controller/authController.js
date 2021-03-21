const express = require('express');
const router = express.Router();
const user = require('../modal/userModal');
const config = require('../config');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//parse data for post call
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
//start passport
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, cb) => {
    cb(null, user)
})

router.get('/health', (req, res) => {
    return res.status(200).send("Health Ok")
})

passport.use(new GoogleStrategy({
    clientID: '828695369341-vbckb8def65aa2todf154lqlhn31m4jv.apps.googleusercontent.com',
    clientSecret: 'XMGFHM7x9_2p-lthhmHJJZS7',
    callbackURL: "http://localhost:7700/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        //   console.log(profile);

        //    User.findOrCreate({ googleId: profile.id }, function (err, user) {

        //    });
        userprofile = profile;
        return done(null, userprofile);
    }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        let token = jwt.sign({ id: Number(userprofile.id) }, config.secret, { expiresIn: 86400 })
        //req.session.user = token;
        const info = {
            "_id": Number(userprofile.id),
            "name": userprofile.name.givenName,
            "email": '',
            "password": '',
            role: 'user',
            isActive: true
        }
        user.findOne({ _id: Number(userprofile.id) }, (err, data) => {
            if (err) throw err;
            if (data) return res.redirect("/dashboard")
            //return res.redirect("/register?errmessage=Email already taken! Use another email!")
            user.create(info, (err, data) => {
                if (err) throw err;
                //return res.redirect("/dashboard")
                return res.status(200).send({ auth: true, token });
            });
        })
        //req.session.user = ;
        //return res.redirect('/dashboard');
    });


router.get('/users', (req, res) => {
    user.find({}, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})
router.post('/register', (req, res) => {
    let hashedPassword = bycrypt.hashSync(req.body.password, 8)
    user.create(
        {
            "_id": new Date().valueOf(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role ? req.body.role : 'user',
            isActive: req.body.isActive ? req.body.isActive : true
        }
        , (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send("Successful registration!");
        })
})

router.post('/login', (req, res) => {
    user.findOne({ email: req.body.email, isActive: true }
        , (err, data) => {
            if (err) return res.status(500).send(err);
            if (!data) return res.status(500).send({ auth: false, err: "No users found login first!" });
            else {
                let validPassword = bycrypt.compareSync(req.body.password, data.password)
                if (!validPassword) return res.status(500).send({ auth: false, err: "Wrong password entered!" });
                let token = jwt.sign({ id: data._id }, config.secret, { expiresIn: 86400 })
                return res.status(200).send({ auth: true, token });
            }
        })
})

router.get('/userInfo', (req, res) => {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(500).send({ auth: false, err: "No token provided!" });
    jwt.verify(token, config.secret, (err, data) => {
        if (err) return res.status(500).send({ auth: false, err: "Wrong token provided!" });
        user.findOne({ _id: data.id }, { password: 0 }, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(data);
        })
    })
})

router.delete('/deleteUser', (req, res) => {
    user.remove({ _id: Number(req.body._id) }
        , (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send("user deleted!");
        })
})

module.exports = router;