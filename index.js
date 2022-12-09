const express = require("express");
const dotenv = require("dotenv")
const mongo = require("./connect");
const router = require("./routers");

dotenv.config();
mongo.connect();
const app = express();
app.use(express.json())

app.use("/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("Hall booking API")
})