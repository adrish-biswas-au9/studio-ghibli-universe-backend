const express = require('express');
//make object of express
let app = express();
const db = require('./db');
const cors = require('cors');
const port = process.env.PORT || 7700;
const authController = require('./controller/authController');
const ordersController = require('./controller/ordersConroller');
const filmsPlaylistController = require('./controller/filmsPlaylistController');
const filmsController = require('./controller/filmsController');
const shoppingWishlistController = require('./controller/shoppingWishlistController');
const followingController = require('./controller/followingController');
const blu_rayController = require('./controller/blu_rayController');
const dvdController = require('./controller/dvdController');
const posterController = require('./controller/posterController');
const t_shirtController = require('./controller/t_shirtController');
const accessorieController = require('./controller/accessorieController');
// const { Router, response } = require('express');

//middleware
//cross origin resource sharing
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send("Health Ok")
})

app.use('/api/auth/', authController)
app.use('/orders/', ordersController)
app.use('/filmsPlaylist/', filmsPlaylistController);
app.use('/films/', filmsController);
app.use('/shoppingWishlist/', shoppingWishlistController);
app.use('/following/', followingController);
app.use('/blu_ray/', blu_rayController);
app.use('/dvd/', dvdController);
app.use('/poster/', posterController);
app.use('/t_shirt/', t_shirtController);
app.use('/accessorie/', accessorieController);



app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
});