const mongoose = require('mongoose');
const t_shirtSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('t_shirt', t_shirtSchema);
module.exports = mongoose.model('t_shirt');