const express = require("express");
const controller = require("../../controllers/v1/article");
const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");
const router = express.Router();
router
  .route("/")
  .post(
    auth,
    isAdmin,
    multer({ storage: multerStorage, limits: { fileSize: 1000000 } }).single(
      "cover"
    ),
    controller.create
  )
  .get(controller.getAll);
router
  .route("/:id")
  .get(controller.getOne)
  .delete(auth, isAdmin, controller.remove);
router.route("/publish/:id").put(auth, isAdmin, controller.publish);
router.route("/unpublish/:id").put(auth, isAdmin, controller.unpublish);
router
  .route("/draft")
  .post(
    auth,
    isAdmin,
    multer({ storage: multerStorage, limits: { fileSize: 1000000 } }).single(
      "cover"
    ),
    controller.draft
  );
router.route("/:href").put(auth, isAdmin, controller.update);
module.exports = router;
