import express from "express";
import * as orderControllers from "../controllers/order.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, orderControllers.orderFish);

export default router;
