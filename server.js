const express = require("express");
const routes = require("./routes/routes");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(helmet());
app.use(morgan("dev"));
app.use("/api", routes);

// Port

module.exports = app;
