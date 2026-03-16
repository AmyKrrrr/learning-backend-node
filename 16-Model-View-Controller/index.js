const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const port = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/amykrrrr-app-1").then(() =>
  console.log("MongoDB Connected"),
);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server started at ${port}`));
