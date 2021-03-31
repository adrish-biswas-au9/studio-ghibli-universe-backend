const mongoose=require('mongoose');
const followingSchema=new mongoose.Schema({
  "name": String,
  "user_id": String,
  "email": String,
  "username": String,
  "date": String
  })
//mongoose.model('collection','schema)
mongoose.model('following',followingSchema);
module.exports=mongoose.model('following');