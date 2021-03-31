const mongoose = require('mongoose');
const blu_raySchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('blu_ray', blu_raySchema);
module.exports = mongoose.model('blu_ray');