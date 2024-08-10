const newsLettermodel = require("../../models/newsLetter");
const validator = require("../../validators/newsLetter");
const nodemailer = require("nodemailer");
exports.getAll = async (req, res) => {
  const newsLetters = await newsLettermodel.find({}).lean();
  res.status(200).json(newsLetters);
};
exports.create = async (req, res) => {
  if (!validator(req.body)) {
    res.status(422).json({ message: "Wrong Email Input" });
  }
  const { email } = req.body;
  const newsLetter = await newsLettermodel.create({ email });
  res.status(201).json({ message: "Joined To Our NewsLetter" });
};
