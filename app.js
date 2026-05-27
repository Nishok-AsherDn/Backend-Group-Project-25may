const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const taskRoutes = require("./routes/task-routes");


const port = process.env.PORT;


app.use(express.json());
app.use("/auth/",require("./routes/auth-routes"))
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.send("API Running");
});
app.listen(port,()=>{
    console.log(`server running ${port}`);
});