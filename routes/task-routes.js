const express = require("express");
const router = express.Router();
const {
    createTask,
    getTasks,
    getTaskById,
    getTaskStats,
    updateTask,
    deleteTask
} = require("../controllers/task-controller");
const validateToken = require("../middlewares/auth-middleware");

router.post("/", validateToken, createTask);
router.get("/", validateToken, getTasks);

router.get("/stats", validateToken, getTaskStats);

router.get("/:id", validateToken, getTaskById);

router.put("/:id", validateToken, updateTask);

router.delete("/:id", validateToken, deleteTask);

module.exports = router;