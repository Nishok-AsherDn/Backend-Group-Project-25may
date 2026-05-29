const asyncHandler = require("express-async-handler");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register User
const register = asyncHandler(async (req, res) => {

    const {
        userName,
        userEmail,
        userPassword
    } = req.body;

    if (!userName || !userEmail || !userPassword) {
        return res.status(400).json({
            message: "Fill all the required input"
        });
    }

    const oldUser = await user.findOne({ userEmail });

    if (oldUser) {
        return res.status(400).json({
            message: "Email already used"
        });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await user.create({
        userName,
        userEmail,
        userPassword: hashedPassword
    });

    if (newUser) {
        return res.status(201).json({
            id: newUser._id,
            userName: newUser.userName,
            userEmail: newUser.userEmail
        });
    }

    return res.status(400).json({
        message: "User not created"
    });

});

// Login User
const login = asyncHandler(async (req, res) => {

    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({
            message: "Please enter email and password"
        });
    }

    const oldUser = await user.findOne({ userEmail });

    if (!oldUser) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const matchPassword = await bcrypt.compare(
        userPassword,
        oldUser.userPassword
    );

    if (!matchPassword) {
        return res.status(401).json({
            message: "Email and password not matched"
        });
    }

    const accessToken = jwt.sign(
        {
            user: {
                id: oldUser._id,
                name: oldUser.userName,
                email: oldUser.userEmail
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20m"
        }
    );

    return res.status(200).json({
        accessToken
    });

});

// Profile
const profile = asyncHandler(async (req, res) => {

    return res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });

});

module.exports = {
    register,
    login,
    profile
};