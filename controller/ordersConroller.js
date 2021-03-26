const express = require('express');
const router = express.Router();
const order = require('../modal/orderModal');
const config = require('../config');
const mongoose = require('mongoose');


//parse data for post call
router.use(express.urlencoded({ extended: true }))
router.use(express.json())