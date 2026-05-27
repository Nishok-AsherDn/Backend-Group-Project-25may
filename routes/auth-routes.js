const express = require("express");
const router = express.Router();

const validateToken = require("../middlewares/auth-middleware");

const {
    profile,login,register
    } = require("../controllers/auth-controller");
    
router.post("/register",register);
router.post("/login",login);
router.get("/profile",validateToken,profile);

module.exports = router;