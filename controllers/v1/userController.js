const userModel = require("../../models/user");
const banUserModel = require("../../models/bannedUser");
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
exports.banUser = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not A valid ID" });
  }
  const mainUser = await userModel.findById(req.params.id).lean();
  if (mainUser) {
    const banUserRes = await banUserModel.create({ phone: mainUser.phone });
    if (banUserRes) {
      return res
        .status(200)
        .json({ message: "User Banned", phone: banUserRes.phone });
    }
    res.status(500).json({ message: "Unkown Error" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};
exports.getAll = async (req, res) => {
  const users = await userModel
    .find({}, "-__v -password -createdAt -updatedAt")
    .lean();
  return res.status(200).json(users);
};
exports.remove = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not A Valid ID" });
  }
  const mainUser = await userModel.findOneAndDelete({ _id: req.params.id });
  if (mainUser) {
    res
      .status(200)
      .json({ message: "User Deleted Succesfully", DeletedUser: mainUser });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
};
exports.setAdmin = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not A Valid ID" });
  }
  const mainUser = await userModel
    .findByIdAndUpdate(req.params.id, {
      $set: {
        role: "ADMIN",
      },
    })
    .lean();
  if (!mainUser) {
    return res.status(404).json({ message: "User Not Found" });
  }
  res
    .status(202)
    .json({ message: "Users Role Set To ADMIN", userID: mainUser._id });
};
exports.updateUser = async (req, res) => {
  const { email, fullname, password, username, phone } = req.body;
  // if(!email||!fullname||!password||!username||!phone){}
  const newHashedPass = await bcrypt.hash(password, 12);
  const user = await userModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          username,
          fullname,
          password: newHashedPass,
          email,
          phone,
        },
      }
    )
    .select("-__v -_id -createdAt -updatedAt")
    .lean();
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  Reflect.deleteProperty(user, "password");
  res.status(202).json(user);
};
