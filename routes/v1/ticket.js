const express = require("express");
const controller = require("../../controllers/v1/ticket");
const isAdmin = require("../../middlewares/isAdmin");
const auth = require("../../middlewares/auth");

const router = express.Router();
router
  .route("/")
  .post(auth, controller.create)
  .get(auth, isAdmin, controller.getAll);
router.route("/user").get(auth, controller.getUserTickets);
router.route("/user/:id").get(auth, controller.getTicket);
router
  .route("/department")
  .get(controller.getDepartments)
  .post(auth, isAdmin, controller.createDepartment);
router.route("/subdepartment").get(controller.getSubDepartments);

router
  .route("/subdepartment/:id")
  .post(auth, isAdmin, controller.createSubDepartment);

router
  .route("/answer/:id")
  .post(auth, isAdmin, controller.setAnswer)
  .get(auth, controller.getAnswer);
module.exports = router;
