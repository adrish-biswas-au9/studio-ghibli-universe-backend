const mongoose=require('mongoose');
const filmsPlaylistSchema=new mongoose.Schema({
    "moviename": String,
    "movieid": String,
    "movieimage": String,
    "email": String,
    "username": String,
    "date": String
  })
//mongoose.model('collection','schema)
mongoose.model('filmsPlaylist',filmsPlaylistSchema);
module.exports=mongoose.model('filmsPlaylist');