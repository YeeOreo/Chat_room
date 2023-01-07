const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongoDB =
    "mongodb+srv://YeeOreo:1234@cluster0.klqduzt.mongodb.net/Chat_Room_API?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
const db = mongoose.connection;
// 與資料庫連線發生錯誤時
db.on("err", (err) => console.log(err));

// 與資料庫連線成功連線時
db.once("open", () => console.log("connected to database..."));

const indexRouter = require("./routes/chatAPI-express+cloud_based");
app.use("/", indexRouter);

module.exports = app;
