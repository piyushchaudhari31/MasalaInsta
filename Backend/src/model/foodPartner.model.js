const mongoose = require('mongoose')

const foodPartenerSchema = new mongoose.Schema({
    contactName:{type:String,required:true},
    email:{
        type:String,required:true
    },
    password:{type:String,required:true},
    address:{type:String,required:true},
    businessName:{type:String,required:true},
    phone:{type:String,required:true},
    gender:{
        type:String,
        default:'male',
        enum:['male','female']
    },
    profilpic:{type:String}

},{timestamps:true})

const foodParnetModel = mongoose.model("foodPartner",foodPartenerSchema)

module.exports = foodParnetModel