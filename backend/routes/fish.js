import express from "express";
import * as fishControllers from "../controllers/fish.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.get("/", fishControllers.getAllFish);
router.post("/", upload.single("image"), fishControllers.addFish);

export default router;
