const db = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;
const Jwt = require("../config/checkJwt");


exports.checkAuth = async (req, res) => {

    const curentLogin = Jwt.getCurrentLogin(req);


    try {
        const queryUserRaw = "SELECT * FROM users WHERE id = ?";
        const resultUserRaw = await sequelize.query(queryUserRaw, { raw: true, logging: false, replacements: [curentLogin.userId], type: QueryTypes.SELECT, });
        const checkMember = resultUserRaw && resultUserRaw.length && resultUserRaw.length > 0 ? resultUserRaw[0] : null;

        if (checkMember) {

            return checkMember;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking auth:", error);
    }

};