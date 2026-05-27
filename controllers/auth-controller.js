const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = asyncHandler(async(req,res)=>{
    const {
        UserName,
        UserEmail,
        UserPassword
    } = req.body;

    if(!UserName||!UserEmail||!UserPassword){
        req.status(400).json({
            "message": "Fill all the required input"
        });
    }
    const oldUser = await User.findOne({ userEmail });

    if (oldUser) {
        res.status(400).json({"message":"Email already used"});
    }
    
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await User.create({
        userName,
        userEmail,
        userPassword: hashedPassword
    });

    if (newUser) {

        res.status(201).json({
            _id: newUser.id,
            userName: newUser.userName,
            email: newUser.userEmail,
        });

    } else {

        res.status(400).json({"message":"User not created"});

    }
});

const login = asyncHandler(async (req, res) => {

    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    const olduser = await User.findOne({ userEmail });

    if (!olduser) {
        res.status(401).json({"Message":"User not found"});
    }

    const matchPassword = await bcrypt.compare(
        userPassword,
        olduser.userPassword
    );

    if (matchPassword) {

        const accessToken = jwt.sign(
            {
                user: {
                    name: olduser.userName,
                    email: olduser.userEmail,
                   
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({
            accessToken
        });

    } else {

        res.status(401).json({"message":"Email and password not matched"});

    }

});
const profile = asyncHandler(async (req, res) => {

    res.status(200).json(req.user);

});

module.exports = {profile,login,register};