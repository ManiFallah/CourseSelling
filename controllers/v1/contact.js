const { isValidObjectId } = require("mongoose");
const contactModel = require("../../models/contact");
const nodemailer = require("nodemailer");
exports.getAll = async (req, res) => {
  const contactUsMessage = await contactModel.find({}).lean();

  res.status(200).json(contactUsMessage);
};
exports.remove = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not A Valid ID" });
  }
  const deletedContact = await contactModel
    .findByIdAndDelete(req.params.id)
    .lean();
  if (!deletedContact) {
    return res.status(404).json({ message: "ContactUs Message Not Found" });
  }
  res.status(202).json({ message: "ContactUs Message Deleted Successfully" });
};
exports.create = async (req, res) => {
  const { fullname, email, body } = req.body;
  if (
    !fullname ||
    fullname == "" ||
    !email ||
    email == "" ||
    body == "" ||
    !body
  ) {
    return res.status(422).json({ message: "Wrong Inputs" });
  }
  const contactUsMessage = await contactModel.create({
    fullname,
    email,
    body,
    answer: 0,
  });
  res.status(201).json({ message: "Contacted Us Successfully" });
};
exports.answer = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "manifallah052@gmail.com",
      pass: procces.env.GMAIL_APP_PASS,
    },
  });
  const contact = await contactModel
    .findByIdAndUpdate(req.params.id, {
      $set: {
        answer: 1,
      },
    })
    .lean();
  if (!contact) {
    return res.status(404).json({ message: "Contact Us Message Not Found" });
  }
  const mailOptions = {
    from: "manifallah052@gmail.com",
    to: contact.email,
    subject: "answer for your message to Our Academy",
    text: req.body.answer,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ message: error });
    } else {
      return res.json({ message: "Answer Mailed Succefully" });
    }
  });
};
