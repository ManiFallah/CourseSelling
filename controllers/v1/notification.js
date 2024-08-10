const { isValidObjectId } = require("mongoose");
const notifModel = require("../../models/notification");
const userModel = require("../../models/user");
exports.create = async (req, res) => {
  const { message, admin } = req.body;
  const notification = await notifModel.create({ message, admin });
  return res.status(201).json({ message: "Notif Sent", notification });
};
exports.get = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  if (await userModel.findById(req.params.id)) {
    const notifications = await notifModel.find({ admin: req.params.id });
    return res.status(200).json(notifications);
  }
  res.status(404).json({ message: "Admin Not Found" });
};
exports.see = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const notification = await notifModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        seen: 1,
      },
    }
  );
  if (notification) {
    return res.status(202).json({ message: "Notification Saw" });
  }
  res.status(404).json({ message: "There is No Notification with this id" });
};
exports.getNotifs = async (req, res) => {
  const notifications = await notifModel.find({ admin: req.user._id });
  if (notifications) {
    res.status(200).json(notifications);
  } else {
    res.status(404).json({ message: "There is Not Any Notifications" });
  }
};
exports.remove = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const notification = await notifModel.findOneAndDelete({
    _id: req.params.id,
  });
  if (!notification) {
    res.status(404).json({ message: "Notification Not Found" });
  } else {
    res.status(202).json({ mesage: "Notif Deletd Successfully" });
  }
};
