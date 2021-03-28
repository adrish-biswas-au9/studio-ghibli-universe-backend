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
        "date": new Date(Date.now()),
        "expiration_date": new Date(new Date(Date.now()).valueOf() + 3600 * 1000 * 24 * 365)
    }

    order.create(info, (err, data) => {
        if (err) res.status(400).send({ auth: true, message: err });
        return res.status(200).send({ auth: true, message: "Data Registered!" })
        // res.redirect('/')
    });
})

router.get('/history',(req,res)=>{
    order.find({}).sort([['date', -1]]).exec((err,data)=>{
        if(err) return  res.status(500).send({ auth: true, message: err });
        return res.status(200).send(data);
    })
})


router.put('/edit',function (req, res) {
    let status;
    // if(req.body.isActive){
    //     if(req.body.isActive=='true'){
    //         status=true
    //     }else{
    //         status=false
    //     }
    // }else{
    //     status=false
    // }
    // var id = req.params.id;
    // let { id } = req.params //destructuring
    let id = req.body._id;
    order.updateOne(
      { _id:req.body._id },
      {
          status: req.body.status
      },
      (err, data) => {
          if (err) res.status(500).send({ auth: true, message: err });
          return res.status(200).send(data)
      })
  })


module.exports = router;