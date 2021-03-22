const express = require('express');
//make object of express
let app = express();
const db = require('./db');
const cors = require('cors');
const port = process.env.PORT || 7700;
const authController = require('./controller/authController');
// const { Router, response } = require('express');
app.use(cors());
app.use('/api/auth/', authController)

//middleware
//cross origin resource sharing


app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
});
