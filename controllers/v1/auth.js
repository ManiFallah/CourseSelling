const userModel = require("../../models/user");
const banModel = require("../../models/bannedUser");
const validator = require("../../validators/userValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const result = validator(req.body);
  if (result != true) {
    return res.status(422).json(result);
  }
  const { username, fullname, email, phone, password } = req.body;
  const bannedPhoneNum = banModel.findOne({ phone });
  if (bannedPhoneNum) {
    return res
      .status(403)
      .json({ message: "this Phone Number has been Banned" });
  }
  const userExists = await userModel.findOne({
    $or: [{ username }, { email }, { phone }],
  });
  if (userExists) {
    return res
      .status(409)
      .json({ message: "there is a user with this username or email" });
  }

  const regCount = await userModel.countDocuments();
  console.log(regCount);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    fullname,
    email,
    phone,
    password: hashedPassword,
    role: regCount > 0 ? "USER" : "ADMIN",
  });
  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });
  return res.status(201).json({ user: userObject, accessToken });
};

exports.login = async (req, res) => {};

exports.getMe = async (req, res) => {};
