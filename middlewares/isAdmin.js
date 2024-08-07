module.exports = async (req, res, next) => {
  if (req.user.role == "ADMIN") {
    return next();
  } else {
    console.log(req.user.role);
    return res
      .status(403)
      .json({ message: "You Don't Have Access To This Route" });
  }
};
