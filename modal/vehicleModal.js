const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema(
    {
        "id": String,
        "name": String,
        "description": String,
        "vehicle_class": String,
        "length": String,
        "pilot": String,
        "films": Array,
        "image_url": String
    }
)
//mongoose.model('collection','schema)
mongoose.model('vehicle', vehicleSchema);
module.exports = mongoose.model('vehicle');