const jwt = require('jsonwebtoken');
const constant = require("../config/constant");

exports.getCurrentLogin = (req) => {
    let jwtPayload;
    try {
        let token = req.headers["authorization"].substring(7);
        jwtPayload = jwt.verify(token, constant.jwtSecret);
    } catch (error) {
        console.log("ERROR - function getCurrentLogin", error);

        return null;
    }
    const { userId, username } = jwtPayload;

    return { "userId": userId, "username": username };
};
