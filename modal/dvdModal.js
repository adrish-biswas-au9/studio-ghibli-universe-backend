const mongoose = require('mongoose');
const dvdSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('dvd', dvdSchema);
module.exports = mongoose.model('dvd');