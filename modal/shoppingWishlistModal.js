const mongoose=require('mongoose');
const shoppingWishlistSchema=new mongoose.Schema({
  "name": String,
  "shopping_id": String,
  "shopping_image": String,
  "email": String,
  "username": String,
  "date": String
  })
//mongoose.model('collection','schema)
mongoose.model('shoppingWishlist', shoppingWishlistSchema);
module.exports=mongoose.model('shoppingWishlist');