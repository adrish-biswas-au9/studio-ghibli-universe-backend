const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    "email": String,
    "status": String,
    "date": String,
    "expiration_date": String
})
//mongoose.model('collection','schema)
mongoose.model('order',orderSchema);
module.exports=mongoose.model('order');