const { isValidObjectId } = require("mongoose");
const menuModel = require("../../models/menu");

exports.createMenu = async (req, res) => {
  const { title, href } = req.body;
  const menu = await menuModel.create({ title, href });
  if (menu) {
    return res.status(201).json({ message: "Menu Created Successfully", menu });
  }
  res.status(500).json({ message: "Unkown Error" });
};
exports.createSubMenu = async (req, res) => {
  const { id } = req.params;
  const { title, href } = req.body;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  if (!(await menuModel.findOne({ _id: id }))) {
    return res
      .status(404)
      .json({ message: "There is No Parent Menu With This ID" });
  }
  const subMenu = await menuModel.create({
    title,
    href,
    isParent: 0,
    parent: id,
  });
  res.status(201).json({ message: "SubMenu Created Successfully", subMenu });
};
exports.getAll = async (req, res) => {
  const parentMenues = await menuModel.find({ isParent: 1 }).lean();
  const subMenues = await menuModel
    .find({ isParent: 0 })
    .populate("parent", "title")
    .lean();
  res.json({ parentMenues, subMenues });
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const deletedMenu = await menuModel.findOneAndDelete({ _id: id });
  if (!deletedMenu) {
    return res.status(404).json({ message: "Menu Not Found" });
  }
  res.status(202).json({ message: "Menu Deleted Successfully", deletedMenu });
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, href } = req.body;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const updatedMenu = await menuModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title,
        href,
      },
    }
  );
  if (updatedMenu) {
    return res.status(202).json({ message: "Menu Updated Successfully" });
  }
  return res.status(404).json({ message: "Menu Not Found" });
};
