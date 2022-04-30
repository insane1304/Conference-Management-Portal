const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// import routes

const authorAuth = require("./routes/authorRouter");
const cors = require("cors");
const nodemailer =require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const fs = require("fs-extra");

const testUpload = require("./routes/test_upload");
const conferenceRouter = require("./routes/conferenceRouter");
dotenv.config();
// mongoose.set('bufferCommands', false);
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true },
    () => console.log("Connected to MongoDB")
);

// Middleware
app.use(express.json());
app.use(cors());
app.use("/author",authorAuth);
app.use("/public", express.static("public"));

app.use("/cert", testUpload);
app.use("/conference", conferenceRouter);

module.exports = app;
