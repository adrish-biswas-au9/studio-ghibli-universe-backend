const mongoose = require('mongoose');
const characterSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('character', characterSchema);
module.exports = mongoose.model('character');