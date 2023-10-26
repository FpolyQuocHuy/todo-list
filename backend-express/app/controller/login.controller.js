const jwt = require('jsonwebtoken');
const constant = require("../config/constant");
const db = require("../models");
const { QueryTypes } = require('sequelize');
const sequelize = db.sequelize;


exports.login = async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        const queryRaw = "SELECT * FROM users WHERE userName=? AND password = ?";

        const resultRaw = await sequelize.query(queryRaw, {
            raw: true, logging: false,
            replacements: [userName, password], type: QueryTypes.SELECT
        })
        console.log("Result : ", resultRaw);
        const checkMember = resultRaw && resultRaw.length && resultRaw.length > 0 ? resultRaw[0] : null;

        if (checkMember) {
            const token = jwt.sign({ userId: checkMember.id, username: checkMember.username }, constant.jwtSecret,
                { expiresIn: constant.jwtSecretExp }
            );

            res.send({
                "connexion": true,
                "jwtToken": token,
                "id": checkMember.id,
                "userName": checkMember.userName,
            });
            return res.status(200);
        } else {
            console.log("ERROR - function login can not find member with username", username);
            res.status(400).send({
                "connexion": false
            });
        }
    } catch (error) {
        console.log("error", error);
    }

};