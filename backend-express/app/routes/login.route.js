module.exports = app => {
    const login = require("../controller/login.controller");

    var router = require("express").Router();

    router.post("/login", login.login);

    app.use('/api/user', router);

};