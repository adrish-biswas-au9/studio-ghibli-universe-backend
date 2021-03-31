const mongoose = require('mongoose');
const accessorieSchema = new mongoose.Schema(
    {
        "id": String,
        "merch_link": String,
        "name": String,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('accessorie', accessorieSchema);
module.exports = mongoose.model('accessorie');