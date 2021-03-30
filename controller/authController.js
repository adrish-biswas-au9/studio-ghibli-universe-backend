const express = require('express');
const router = express.Router();
const user = require('../modal/userModal');
const cloudinary = require('cloudinary').v2;
const config = require('../config');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
cloudinary.config({
    cloud_name: 'aryabhatta',
    api_key: '346714616856731',
    api_secret: 'YRCQnQAD3PmwdJ8kE3Wd3vVg_Qc'
})

//parse data for post call
router.use(express.urlencoded({ extended: true }))
router.use(express.json())
//router.use(cors())

// router.get('/', (req, res) => {
//     return res.status(200).send("Health Ok")
// })


router.post('/google', (req, res) => {
    const info = {
        "name": req.body.name,
        "email": req.body.email,
        "password": '',
        "role": req.body.role ? req.body.role : 'user',
        "image_url": 'https://res.cloudinary.com/aryabhatta/image/upload/v1617085930/826333_qiurvd.png',
        "isActive": Boolean(req.body.isActive) ? Boolean(req.body.isActive) : true
    }
    user.findOne({
        "isActive": Boolean(req.body.isActive) ? Boolean(req.body.isActive) : true,
        "email": req.body.email
    }, (err, data) => {
        if (err) return res.status(500).send(err);
        if (!data) {
            user.create(info, (err, data) => {
                if (err) return res.status(500).send(err);
                //return res.redirect("/dashboard")
                // res.setHeader('Access-Control-Allow-Origin', '*')
                // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                // return done(null, { auth: true, token });
                return res.status(200).send(info);
            });
        }
        else {
            // res.setHeader('Access-Control-Allow-Origin', '*')
            // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            // return done(null, { auth: true, token });
            return res.status(200).send(data);
        }

        //return res.redirect("/register?errmessage=Email already taken! Use another email!")

    })
})



//register
router.post('/register', (req, res) => {
    let hashedPassword = bycrypt.hashSync(req.body.password, 8)
    const info = {
        "name": req.body.name,
        "email": req.body.email,
        "password": hashedPassword,
        "role": req.body.role ? req.body.role : 'user',
        "image_url": 'https://res.cloudinary.com/aryabhatta/image/upload/v1617085930/826333_qiurvd.png',
        "isActive": Boolean(req.body.isActive) ? Boolean(req.body.isActive) : true
    }
    user.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data) return res.status(400).send({ auth: false, message: "Email already taken! Use another email!" })
        user.create(info, (err, data) => {
            if (err) throw err;
            return res.status(200).send({ auth: true, message: "Data Registered!" })
            // res.redirect('/')
        });
    })

});

//get all users
router.get('/users', (req, res) => {
    user.find({ isActive: true }, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
})


//login
router.post('/login', (req, res) => {

    const info = {
        "isActive": Boolean(req.body.isActive) ? Boolean(req.body.isActive) : true,
        "email": req.body.email
    }
    user.findOne(info, (err, data) => {
        if (err || !data) {
            return res.status(400).send("Inavlid email! Please try again");
        }
        let validPassword = bycrypt.compareSync(req.body.password, data.password)
        if (!validPassword) return res.status(400).send("Wrong password entered!");
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

router.put('/delete', function (req, res) {
    // let status;
    // if (req.body.isActive) {
    //     if (req.body.isActive == 'true') {
    //         status = true
    //     } else {
    //         status = false
    //     }
    // } else {
    //     status = false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring
    let id = req.body._id;
    user.updateOne(
        { email: req.body.email },
        {
            isActive: false
        },
        (err, data) => {
            if (err) res.status(500).send({ auth: true, message: err });
            return res.status(200).send(data)
        })
})

router.put('/edit', function (req, res) {
    // let status;
    // if (req.body.isActive) {
    //     if (req.body.isActive == 'true') {
    //         status = true
    //     } else {
    //         status = false
    //     }
    // } else {
    //     status = false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring
    let id = req.body._id;
    user.updateOne(
        { email: req.body.email },
        {
            role: req.body.role
        },
        (err, data) => {
            if (err) res.status(500).send({ auth: true, message: err });
            return res.status(200).send(data)
        })
})


router.post('/userInfo', (req, res) => {



    user.findOne({ _id: req.body._id }, { password: 0 }, (err, data) => {
        if (err) return res.status(500).send({ auth: true, message: err });
        return res.status(200).send(data);
    })

})


router.post('/image_upload', (req, res) => {
    console.log(req.files)
    console.log(req.body)

    let image = req.files.avatar;
    // if (image.mimetype !== 'image/jpeg') {
    //     return res.redirect("/?errmessage=Only jpg/jpeg extensions are allowed.")
    // }
    cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
        if (err) res.status(500).send({ auth: true, message: err });;
        //return res.send(result)
        //lol2
        // let info = {
        //     user_given_name: req.body.user_name,
        //     image_name: result.original_filename,
        //     path: result.url
        // }
        // dbo.collection(col_name).insert(info, (err, data) => {
        //     if (err) throw err;
        //     return res.redirect("/?successmessage=Successfully Uploaded!")
        //     // res.status(200).send("Data Registered.")
        // });
        user.updateOne(
            { email: req.body.email },
            {
                image_url: result.url
            },
            (err, data) => {
                if (err) res.status(500).send({ auth: true, message: err });
                return res.status(200).send({ auth: true, message: err })
            })
    });
    // image.mv(__dirname + '/public/images/'+ image.name,(err,data)=>{
    //     if(err)  throw err;



    // })
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