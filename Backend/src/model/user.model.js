const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    fullName:{
        firstName:{type:String,required:true},
        lastName:{type:String,required:true}
    },
    email:{type:String , required:true , unique:true},
    password:{type:String},
    gender:{type:String,default:"male",enum:['male','female']},
    profilepic:{type:String}
},{timestamps:true})

const userModel = mongoose.model("authUser",authSchema)

module.exports = userModel

