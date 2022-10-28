const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type:String , unique : true},
    password : String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
})
const User = mongoose.model("user",userSchema);
module.exports= User;