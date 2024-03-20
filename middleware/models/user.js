const mongoose =require("mongoose")
const userschema=new mongoose.Schema({
    phno:{type:Number},
    priority:{type:Number},
})
const user=mongoose.model("User",userschema);
module.exports=user;