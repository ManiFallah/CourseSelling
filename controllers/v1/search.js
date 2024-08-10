const courseModel = require("../../models/course");

exports.find = async (req, res) => {
  const { keyword } = req.params;
  const courses = await courseModel
    .find({
      $or: [
        { name: { $regex: ".*" + keyword + ".*" } },
        { href: { $regex: ".*" + keyword + ".*" } },
        { description: { $regex: ".*" + keyword + ".*" } },
      ],
    })
    .lean();
  if (courses) {
    res.status(200).json(courses);
  } else {
    res.status(404).json({ message: "There is No Course with this keyword" });
  }
};
