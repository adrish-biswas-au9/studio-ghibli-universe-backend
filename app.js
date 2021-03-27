const express = require('express');
//make object of express
let app = express();
const db = require('./db');
const cors = require('cors');
const port = process.env.PORT || 7700;
const authController = require('./controller/authController');
const ordersController = require('./controller/ordersConroller');
// const { Router, response } = require('express');
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send("Health Ok")
})

app.use('/api/auth/', authController)
app.use('/orders/', ordersController)
//middleware
//cross origin resource sharing


app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
});
