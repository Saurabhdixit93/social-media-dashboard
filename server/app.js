const express = require("express");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/DB");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 6000;

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Router
app.use("/", require("./routers"));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Successfull Running..");
  });
});
