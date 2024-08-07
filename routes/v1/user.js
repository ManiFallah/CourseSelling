const express = require("express");
const userController = require("../../controllers/v1/userController");
const isAdmin = require("../../middlewares/isAdmin");
const auth = require("../../middlewares/auth");
const router = express.Router();
router
  .route("/")
  .get(auth, isAdmin, userController.getAll)
  .put(auth, userController.updateUser);
router.route("/:id").delete(auth, isAdmin, userController.remove);
router.route("/ban/:id").post(auth, isAdmin, userController.banUser);
router.route("/setAdmin/:id").put(auth, isAdmin, userController.setAdmin);
module.exports = router;
