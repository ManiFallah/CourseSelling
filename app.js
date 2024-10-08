const express = require("express");
const authRouter = require("./routes/v1/auth");
const userRouter = require("./routes/v1/user");
const courseRouter = require("./routes/v1/course");
const categoryRouter = require("./routes/v1/category");
const commentRouter = require("./routes/v1/comment");
const contactRouter = require("./routes/v1/contact");
const newsLetterRouter = require("./routes/v1/newsLetter");
const searchRouter = require("./routes/v1/search");
const notifRouter = require("./routes/v1/notification");
const offRouter = require("./routes/v1/off");
const articleRouter = require("./routes/v1/article");
const orderRouter = require("./routes/v1/order");
const ticketRouter = require("./routes/v1/ticket");
const menuRouter = require("./routes/v1/menu");
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
app.use("/v1/newsLetter", newsLetterRouter);
app.use("/v1/user", userRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/course", courseRouter);
app.use("/v1/comments", commentRouter);
app.use("/v1/contact", contactRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/notif", notifRouter);
app.use("/v1/off", offRouter);
app.use("/v1/article", articleRouter);
app.use("/v1/order", orderRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/menu", menuRouter);
module.exports = app;
