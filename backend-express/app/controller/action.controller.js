const db = require("../models");
const { QueryTypes } = require('sequelize');
const sequelize = db.sequelize;
const Auth = require('./checkAuth.controller');
const { getCurrentLogin } = require("../config/checkJwt");


exports.createTask = async (req, res) => {
    const body = req.body;

    console.log("body", body);
    const isAuth = await Auth.checkAuth(req);

    try {
        if (isAuth) {
            if (body.id) {

                console.log("update");
                const queryRaw = "UPDATE tasks SET title = ? ,details = ? , status = ? , userID = ? WHERE id = ?";
                const resultRaw = await sequelize.query(queryRaw, {
                    raw: true,
                    logging: false,
                    replacements: [body.title, body.detail, body.status, body.userID, body.id],
                    type: QueryTypes.INSERT
                });
                res.status(200).json({ message: 'Task created successfully' });


            } else {

                console.log("body", body);
                const queryRaw = "INSERT INTO tasks (title, details, status, userID, createAt) VALUES (?, ?, ?, ?, ? );";
                const resultRaw = await sequelize.query(queryRaw, {
                    raw: true,
                    logging: false,
                    replacements: [body.title, body.detail, 3, 1, new Date(),],
                    type: QueryTypes.INSERT
                });
                console.log("resultRaw ", resultRaw);
                res.status(200).json({ message: 'Task created successfully' });




            }

        } else {
            res.status(401).send('member is not login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

exports.getList = async (req, res) => {
    try {
        const queryRaw = `
            SELECT t.*, st.name AS status_name, u.fullName
            FROM tasks t
            JOIN users u ON t.userID = u.id
            JOIN \`status-task\` st ON t.status = st.id
        `;

        const resultRaw = await sequelize.query(queryRaw, {
            raw: true,
            logging: false,
            replacements: [],
            type: QueryTypes.SELECT,
        });

        console.log("resultRaw", resultRaw);
        res.status(200).json(resultRaw);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: error.message });
    }
}
exports.getListStatus = async (req, res) => {
    try {
        const queryRaw = `
            SELECT * FROM status-task
        `;

        const resultRaw = await sequelize.query(queryRaw, {
            raw: true,
            logging: false,
            replacements: [],
            type: QueryTypes.SELECT,
        });

        console.log("resultRaw", resultRaw);
        res.status(200).json(resultRaw);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: error.message });
    }
}
exports.getDetails = async (req, res) => {
    const id = req.query.id;
    console.log("id : ", id);
    try {
        const queryRaw = `SELECT t.*, st.name AS status_name, u.fullName
        FROM tasks t
        JOIN users u ON t.userID = u.id
        JOIN \`status-task\` st ON t.status = st.id WHERE t.id = ?;`;
        const resultRaw = await sequelize.query(queryRaw, { raw: true, logging: false, replacements: [id], type: QueryTypes.SELECT });
        res.status(200);
        res.send(resultRaw[0]);
    } catch (error) {
        console.log("error ", error);
        res.status(500);
        res.send(error)
    }


};

exports.delete = async (req, res) => {
    const isAuth = await Auth.checkAuth(req);
    const body = req.body;
    if (isAuth) {
        console.log("body.id ", body.id);
        const queryRaw = "DELETE FROM tasks WHERE id=? ";
        try {
            const resultRaw = await sequelize.query(queryRaw, {
                raw: true,
                logging: false,
                replacements: [body.id],
                type: QueryTypes.DELETE
            });
            res.send({})
            res.status(200);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(401).send('member is not admin');
    }

}