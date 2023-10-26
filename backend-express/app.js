const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const port = 8080;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});
const cors = require('cors');
app.use(cors());
require("./app/routes/login.route.js")(app);
require("./app/routes/action.route.js")(app);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});