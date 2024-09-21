import express from "express";
import * as fishControllers from "../controllers/fish.js";
import upload from "../middleware/multer.js";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

router.get("/", fishControllers.getAllFish);
router.get("/:fishId", fishControllers.getFish);
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  fishControllers.addFish
);
router.put(
  "/:fishId",
  verifyToken,
  isAdmin,
  upload.single("image"),
  fishControllers.editFish
);

export default router;
