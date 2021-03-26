const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    "name": String,
    "status": String,
    "date": String
})
//mongoose.model('collection','schema)
mongoose.model('order',orderSchema);
module.exports=mongoose.model('order');