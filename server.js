const express = require("express");
const routes = require("./routes/routes");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   // โดเมนของเว็บไซต์หรือโดเมนที่ต้องการอนุญาต
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   // เมธอดที่อนุญาต
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api", routes);

module.exports = app;
