const express = require("express");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/task-routes");

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/auth",require("./routes/auth-routes"));

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(port,()=>{
    console.log(`server running ${port}`);
});