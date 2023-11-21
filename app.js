require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./src/router/index");
const db = require("./src/database/models");
const port = 3001;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/image", express.static("./public/images"));

db.sequelize
  .sync()
  .then(() => {
    console.log("success");
  })
  .catch(console.error);

app.listen(port);
console.log("listening at " + "127.0.0.1:" + port);
