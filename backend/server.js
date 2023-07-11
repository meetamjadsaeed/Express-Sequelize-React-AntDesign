const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./app/config/db.config");

const helmet = require("helmet");
const appRouter = require("./app/routes");
const configureExpressApp = require("./app/config/appConfigure.config");

const app = express();
configureExpressApp(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;

db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () => {
            console.log("server running on port:", PORT);
            appRouter(app);
        })
    )
    .catch((err) => console.log("err", err));
