const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT;

app.use(express.json());

app.listen(port,()=>{
    console.log(`server running ${port}`);
});