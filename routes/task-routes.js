const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks
} = require("../controllers/task-controller");
const validateToken = require("../middlewares/auth-middleware");
router.post("/", validateToken, createTask);
router.get("/", validateToken, getTasks);
module.exports = router;