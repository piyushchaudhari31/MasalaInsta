const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("✅ connected Sucessfully")}).catch(()=>{console.log("Error")})
}

module.exports = connectToDb