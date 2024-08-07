const { isValidObjectId } = require("mongoose");
const courseModel = require("../../models/course");
const commentModel = require("../../models/comment");
const sessionModel = require("../../models/session");
const courseUserModel = require("../../models/courseUser");
exports.create = async (req, res) => {
  const {
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    category,
  } = req.body;
  const course = await courseModel.create({
    name,
    description,
    support,
    href,
    price,
    status,
    discount,
    category,
    teacher: req.user._id,
    cover: req.file.filename,
  });
  if (course) {
    const main = await courseModel
      .findById(course._id)
      .populate("teacher", "-password");
    res.status(201).json({ message: "Course Created Successfully", main });
  }
};
exports.creatSession = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Wrong Inputs" });
  }
  const id = req.params.id;
  const { title, free, time } = req.body;
  const session = await sessionModel.create({
    title,
    free,
    course: id,
    time,
    video: req.file.filename,
  });
  if (session) {
    return res.status(201).json(session);
  }
};
exports.getAll = async (req, res) => {
  const sessions = await sessionModel
    .find({}, "-__v ")
    .populate("course", "name -_id")
    .lean();
  sessions.forEach((session) => {
    Reflect.deleteProperty(session.course, "__v");
  });
  res.status(200).json(sessions);
};
exports.getSession = async (req, res) => {
  const { href, sessionID } = req.params;
  const course = await courseModel.findOne({ href }).lean();
  if (!course) {
    return res.status(404).json({ message: "Course Not found" });
  }
  if (!isValidObjectId(sessionID)) {
    console.log(sessionID);
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const session = await sessionModel
    .findOne({ _id: sessionID, course: course._id }, "-__v")
    .populate("course", "name -_id");
  if (!session) {
    return res.status(404).json({ message: "Session Not Found" });
  }
  const sessions = await sessionModel
    .find({ course: course._id }, "-__v")
    .populate("course", "name -_id")
    .lean();
  res.status(200).json({ session, courseSessions: sessions });
};
exports.delete = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const session = await sessionModel
    .findOneAndDelete({ _id: req.params.id })
    .lean();
  if (!session) {
    return res.status(404).json({ message: "Session Not Found" });
  }
  res.status(202).json({ message: "Session Deleted Succesfully" });
};
exports.register = async (req, res) => {
  const { href } = req.params;
  const course = await courseModel.findOne({ href }).lean();
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const reg = await courseUserModel.create({
    user: req.user._id,
    course: course._id,
    price: course.price,
  });
  res.status(201).json({
    message: "Registered Successfully",
    course: course.name,
    coursePrice: reg.price,
  });
};
exports.getOne = async (req, res) => {
  const course = await courseModel
    .findOne({ href: req.params.href })
    .populate("teacher", "fullname")
    .populate("category", "title")
    .lean();
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const courses = await courseModel
    .find({
      category: course.category,
      _id: {
        $ne: course._id,
      },
    })
    .select("name category price")
    .lean();
  const comments = await commentModel
    .find(
      { course: course._id, isAccepted: 1, isAnswer: 0 },
      "-course -isAccepted"
    )
    .populate("user", "username");
  const answers = await commentModel
    .find(
      { course: course._id, isAccepted: 1, isAnswer: 1 },
      "-course -isAccepted"
    )
    .populate("user", "username");
  const sessions = await sessionModel.find({ course: course._id }, "-course");
  const count = await courseUserModel.countDocuments({ course: course._id });
  const isRegistered = !!(await courseUserModel.findOne({
    course: course._id,
    user: req.user._id,
  }));
  res.status(200).json({
    course,
    sessions,
    mainComment: comments,
    answers,
    count,
    relatedCourses: courses,
    isRegistered,
  });
};
exports.delete = async (req, res) => {
  const course = await courseModel.findOneAndDelete({ href: req.params.href });
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const comments = await commentModel.find({ course: course._id }).lean();
  comments.forEach((comment) => {
    commentModel.findOneAndDelete({ _id: comment._id });
  });
  const sessions = await sessionModel.find({ course: course._id }).lean();
  sessions.forEach((comment) => {
    sessionModel.findOneAndDelete({ _id: comment._id });
  });
  res.status(202).json({ message: "Course Deleted Successfully" });
};
exports.getPopular = async (req, res) => {
  const courses = await courseModel.find({}).lean();
  courses.forEach(async (course) => {
    course.users = await courseUserModel
      .find({ course: course._id })
      .countDocuments();
  });
  courses.sort(function (a, b) {
    return a.users - b.users;
  });
  const topCourses = [
    courses[0],
    courses[1],
    courses[2],
    courses[3],
    courses[4],
  ];
  res.status(200).json(topCourses);
};
