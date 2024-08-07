const jwt = require("jsonwebtoken");

const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  if (!req.header("Authorization")) {
    return res
      .status(403)
      .json({ message: "You Dont Have Access To This Route" });
  }
  const authHeader = req.header("Authorization").split(" ");
  if (authHeader.length != 2) {
    return res
      .status(403)
      .json({ message: "You Dont Have Access To This Route" });
  }
  const token = authHeader[1];
  try {
    const jwtPayLoad = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(jwtPayLoad.id).lean();
    Reflect.deleteProperty(user, "password");
    req.user = user;
    next();
  } catch (error) {
    return res.json(error);
  }
};
