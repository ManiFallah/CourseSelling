const express = require("express");
const controller = require("../../controllers/v1/off");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const router = express.Router();
router
  .route("/")
  .get(auth, isAdmin, controller.getAll)
  .post(auth, isAdmin, controller.create);
router.route("/all").put(auth, isAdmin, controller.campaign);
router.route("/use/:code").get(auth, controller.getOne);
router.route("/code");
router.route("/:id").delete(auth, isAdmin, controller.remove);
module.exports = router;
