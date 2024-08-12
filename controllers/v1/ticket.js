const ticketModel = require("../../models/ticket");
const departmentModel = require("../../models/department");
const subdepartmentModel = require("../../models/subdepartment");
const ticketAnswerModel = require("../../models/ticketAnswers");
const { isValidObjectId } = require("mongoose");

exports.createDepartment = async (req, res) => {
  const { title } = req.body;
  const dep = await departmentModel.create({ title });
  if (dep) {
    res
      .status(201)
      .json({ message: "Department Created Successfully", Department: dep });
  }
};
exports.createSubDepartment = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  if (!(await departmentModel.find({ _id: id }))) {
    return res
      .status(404)
      .json({ message: "There is No Department with this ID" });
  }
  const { title } = req.body;
  const dep = await subdepartmentModel.create({ title, parent: id });
  if (dep) {
    res
      .status(201)
      .json({ message: "Department Created Successfully", SubDepartment: dep });
  }
};
exports.create = async (req, res) => {
  const { title, body, departmentId, subDepartmentId, course, priorty } =
    req.body;
  if (
    !(
      isValidObjectId(departmentId) ||
      isValidObjectId(subDepartmentId) ||
      !course ||
      isValidObjectId(course)
    )
  ) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  if (!(await departmentModel.findById(departmentId))) {
    return res
      .status(404)
      .json({ message: "There is No Department With This ID" });
  }
  if (!(await subdepartmentModel.findById(subDepartmentId))) {
    return res
      .status(404)
      .json({ message: "There is No SubDepartment With This ID" });
  }
  const ticket = await ticketModel.create({
    title,
    body,
    departmentId,
    subDepartmentId,
    course,
    priorty,
    user: req.user._id,
  });
  if (ticket) {
    res.status(201).json({ message: "ticket Sent Successfully" });
  }
};
exports.getAll = async (req, res) => {
  const tickets = await ticketModel.find({}).lean();
  if (tickets) {
    return res.status(200).json(tickets);
  } else {
    return res.status(404).json({ message: "There is No Ticket" });
  }
};
exports.getUserTickets = async (req, res) => {
  const tickets = await ticketModel.find({ user: req.user._id });
  if (tickets) {
    res.status(200).json(tickets);
  } else {
    res.status(404).json({ message: "You Havent Send Us Any Tickets" });
  }
};
exports.getTicket = async (req, res) => {
  const { id } = req.params;
  const ticket = await ticketModel.findOne({ _id: id, user: req.user._id });
  if (!ticket) {
    return res
      .status(404)
      .json({ message: "You Havent Send Us Any Ticket With This ID" });
  }
  res.status(200).json(ticket);
};
exports.getDepartments = async (req, res) => {
  const departments = await departmentModel.find({}).lean();
  if (departments) {
    return res.status(200).json(departments);
  }
  res.status(500).json({ message: "Unkown Error" });
};
exports.getSubDepartments = async (req, res) => {
  const subDepartments = await subdepartmentModel.find({}).lean();
  if (subDepartments) {
    return res.status(200).json(subDepartments);
  }
  res.status(500).json({ message: "Unkown Error" });
};
exports.setAnswer = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "NOt a Valid ID" });
  }
  const ticket = await ticketModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        isAnswered: 1,
      },
    }
  );
  if (!ticket) {
    return res.status(404).json({ message: "There is No Ticket with this ID" });
  }
  const { body } = req.body;
  const answer = await ticketAnswerModel.create({
    ticket: id,
    body,
    admin: req.user._id,
  });
  res.status(201).json({ message: "Ticket Answered Successfully" });
};
exports.getAnswer = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const ticket = await ticketModel.findOne({ _id: id });
  if (!req.user._id.equals(ticket.user)) {
    return res.status(403).json({ message: "You Havent Sent This Ticket" });
  }
  if (!ticket) {
    return res.status(404).json({ message: "There is No Ticket with this ID" });
  }
  if (ticket.isAnswered == 1) {
    const answer = await ticketAnswerModel.findOne({ ticket: id });
    return res.status(200).json(answer);
  }
  res.status(404).json({ message: "There is No Answer For Your Ticket" });
};
