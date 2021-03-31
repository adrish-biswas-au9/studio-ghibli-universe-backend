const mongoose = require('mongoose');
const videogameSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('videogame', videogameSchema);
module.exports = mongoose.model('videogame');