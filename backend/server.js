require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const db = mongoose.connection;
mongoose.connect("127.0.0.1");
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const app = express();
app.use(express.json()); // accept json in header

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server started at port 3000"));
