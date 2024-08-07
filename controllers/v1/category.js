const { isValidObjectId } = require("mongoose");
const categorymodel = require("../../models/category");
const courseModel = require("../../models/course");

exports.create = async (req, res) => {
  const { title, href } = req.body;
  if (!title || !href || title == "" || href == "") {
    res.status(422).json("Wrong Input");
  }
  const category = await categorymodel.create({ title, href });
  if (category) {
    res.status(201).json(category);
  } else {
    res.status(500).json({ message: "Unkown Error" });
  }
};
exports.delete = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const id = req.params.id;
  const category = await categorymodel.findOneAndDelete({ _id: id });
  if (category) {
    res.status(202).json({ message: "Category Deleted Successfully" });
  } else {
    res.status(404).json({ message: "Category Not Found" });
  }
};
exports.update = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const id = req.params.id;
  const { title, href } = req.body;
  const category = await categorymodel
    .findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          href,
        },
      }
    )
    .lean();
  if (category) {
    res.status(202).json({ message: "Category Updated", category });
  } else {
    res.status(404).json({ message: "Category Not Found" });
  }
};
exports.getAll = async (req, res) => {
  const categories = await categorymodel.find({}).lean();
  res.json(categories);
};
exports.getCourses = async (req, res) => {
  const { href } = req.params;
  const category = await categorymodel.findOne({ href }).lean();
  if (!category) {
    return res.status(404).json({ message: "Category Not Found" });
  }
  const courses = await courseModel.find({ category: category._id }).lean();
  res.status(200).json({ categoryTitle: category.title, courses });
};
