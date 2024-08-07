const express = require("express");
const controller = require("../../controllers/v1/course");
const multer = require("multer");
const uploader = require("../../utils/uploader");
const router = express.Router();
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
router
  .route("/")
  .post(
    multer({ storage: uploader, limits: { fileSize: 1000000000 } }).single(
      "cover"
    ),
    auth,
    isAdmin,
    controller.create
  );
router
  .route("/:id/sessions")
  .post(
    multer({ storage: uploader }).single("video"),
    auth,
    isAdmin,
    controller.creatSession
  );
router.route("/popular").get(controller.getPopular);
router.route("/presell").get(controller.preSell);
router.route("/sessions").get(auth, isAdmin, controller.getAll);
router.route("/sessions/:id").delete(auth, isAdmin, controller.delete);
router.route("/:href/:sessionID").get(controller.getSession);
router
  .route("/:href")
  .post(auth, controller.register)
  .get(auth, controller.getOne)
  .delete(auth, isAdmin, controller.delete);
module.exports = router;
