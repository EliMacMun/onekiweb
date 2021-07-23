const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const morgan = require("morgan");

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'))
app.set('layout', './layouts/index')

//midlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.listen(app.get("port"), () => {
    console.log(`listen on port ${app.get("port")}`);
});

//routes
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));