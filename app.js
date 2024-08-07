const express = require("express");
const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const courseRouter = require("./routes/v1/course");
const categoryRouter = require("./routes/v1/category");
const commentRouter = require("./routes/v1/comment");
const contactRouter = require("./routes/v1/contact");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);
app.use("/v1/comments", commentRouter);
app.use("/v1/contact", contactRouter);
module.exports = app;
