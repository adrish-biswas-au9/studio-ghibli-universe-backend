const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:String,
    isActive: Boolean
})
//mongoose.model('collection','schema)
mongoose.model('user',userSchema);
module.exports=mongoose.model('user');