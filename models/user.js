const mongoose = require("mongoose");

const userdata = mongoose.Schema({

    userName: {
        type: String,
        required: [true, "please enter the user name"]
    },

    userEmail: {
        type: String,
        required: [true, "please enter the user email"]
    },

    userPassword: {
        type: String,
        required: [true, "please enter the password"]
    },

});

module.exports = mongoose.model("user", userdata);