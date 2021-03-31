const mongoose = require('mongoose');
const posterSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('poster', posterSchema);
module.exports = mongoose.model('poster');
