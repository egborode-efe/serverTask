const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");

const port = 4000;
const taskRouter = require("./route/taskRouter");
const authRouter = require("./route/authRouter");
const notFound = require("./middlewears/notFound");
const errorHandler = require("./middlewears/error");
//
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use(errorHandler);
app.use(notFound);
const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Could not connect due to ${error.message}`);
  }
};
start();
