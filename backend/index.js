const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
require("./models/db.js")
const AuthRouter = require('./route/AuthRoutes.js')
const PORT = process.env.port || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth",AuthRouter)



app.listen(PORT,(req,res)=>{
  console.log(`server is running at port ${PORT}`);
})