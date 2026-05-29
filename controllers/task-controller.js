const Task = require("../models/task");

const createTask = async (req, res) => {

    try {

        const { title, description, status, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            user: req.user.id
        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getTaskById = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getTaskStats = async (req, res) => {

    try {

        const totalTasks = await Task.countDocuments({
            user: req.user.id
        });

        const completedTasks = await Task.countDocuments({
            user: req.user.id,
            status: "completed"
        });

        const pendingTasks = await Task.countDocuments({
            user: req.user.id,
            status: "pending"
        });

        const inProgressTasks = await Task.countDocuments({
            user: req.user.id,
            status: "in-progress"
        });

        res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTaskStats
};