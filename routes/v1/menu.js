const express = require("express");
const controller = require("../../controllers/v1/menu");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const router = express.Router();
router
  .route("/")
  .get(controller.getAll)
  .post(auth, isAdmin, controller.createMenu);
router
  .route("/:id")
  .post(auth, isAdmin, controller.createSubMenu)
  .delete(auth, isAdmin, controller.remove);
module.exports = router;
