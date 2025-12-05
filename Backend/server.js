require('dotenv').config()
const app = require("./src/app");
const connectToDb = require('./src/db/db');


connectToDb()
const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server is running on port 3000");
}) 