module.exports = app => {
    const action = require("../controller/action.controller");

    var router = require("express").Router();

    router.post("/create", action.createTask);
    router.post("/delete", action.delete);
    router.get("/list", action.getList);
    router.get("/listStatus", action.getListStatus);
    router.get("/details", action.getDetails);

    app.use('/api/task', router);

};
