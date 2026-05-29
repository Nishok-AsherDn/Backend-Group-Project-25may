const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandle(async(req,res,next)=>{
    let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {

        token = authHeader.split(" ")[1];

        jwt.verify(
            token,process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {

                if (err) {
                    res.status(401);
                    throw new Error("Token invalid");
                }

                console.log(decoded.user);

                req.user = decoded.user;

                next();

            }
        );

    } else {

        res.status(401);
        throw new Error("Token missing");

    }

});

module.exports = validateToken;
