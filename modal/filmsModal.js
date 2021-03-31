const mongoose=require('mongoose');
const filmsSchema=new mongoose.Schema(
    {
        "id": String,
        "title": String,
        "description": String,
        "director": String,
        "producer": String,
        "release_date": String,
        "back_wall": String,
        "trailer_url": String,
        "video_url": String,
        "char": Array,
        "loc": Array,
        "veh": Array,
        "video_buy": Array,
        "merch_buy": Array,
        "rt_score": String,
        "characters": Array,
        "species": Array,
        "locations": Array,
        "vehicles": Array,
        "image_url": String
      }
  )
//mongoose.model('collection','schema)
mongoose.model('films',filmsSchema);
module.exports=mongoose.model('films');