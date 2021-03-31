const mongoose = require('mongoose');
const video_gameSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('video_game', video_gameSchema);
module.exports = mongoose.model('video_game');