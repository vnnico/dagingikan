import express from "express";
import * as cartControllers from "../controllers/cart";
const router = express.Router();

router.get("/", cartControllers.getMyCarts);
router.post("/", cartControllers.addToCart);

export default router;
