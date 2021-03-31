const mongoose = require('mongoose');
const characterSchema = new mongoose.Schema(
    {
        "id": Number,
        "name": String,
        "gender": String,
        "age": Number,
        "eye_color": String,
        "hair_color": String,
        "films": Array,
        "film_image_url": String,
        "species": String,
        "image_url": String
      }
)
//mongoose.model('collection','schema)
mongoose.model('character', characterSchema);
module.exports = mongoose.model('character');