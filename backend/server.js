require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL);
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const app = express();
app.use(express.json()); // accept json in header

app.use(cors());
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(3001, () => console.log("API Server started at port 3001"));
