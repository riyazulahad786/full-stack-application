const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URI
mongoose.connect(mongodb_url)
.then((res)=>{
    console.log("database connection successfull")
}).catch((err)=>{
    console.log("failed to connect database",err)
})