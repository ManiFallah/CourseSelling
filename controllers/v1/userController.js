const userModel = require("../../models/user");
const banUserModel = require("../../models/bannedUser");
exports.banUser = async (req, res) => {
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
