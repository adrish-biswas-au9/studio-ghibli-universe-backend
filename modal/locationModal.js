const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema(
    {
        "id": String,
        "name": String,
        "climate": String,
        "terrain": String,
        "surface_water": String,
        "residents": Array,
        "films": Array,
        "image_url": Array
      }
)
//mongoose.model('collection','schema)
mongoose.model('location', locationSchema);
module.exports = mongoose.model('location');