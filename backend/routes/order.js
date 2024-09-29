import express from "express";
import * as orderControllers from "../controllers/order.js";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();

/**
 * Ordering Fish
 */
router.post("/", verifyToken, orderControllers.createOrder);

/**
 * Get Current Customer's Order
 */
router.get("/", verifyToken, orderControllers.getOrders);

/**
 * [ ADMIN ]
 * Get All Orders
 */
router.get("/all", verifyToken, isAdmin, orderControllers.getAllOrders);

/**
 * Get Customer's Order
 */
router.get("/:userId", verifyToken, orderControllers.getCustomerOrder);

/**
 * Check Transaction Order Status
 */
router.post(
  "/check_transaction_status",
  verifyToken,
  orderControllers.checkTransactionStatus
);

/**
 * Get Transaction Notification
 */
router.post(
  "/transaction_notification",
  orderControllers.getTransactionNotification
);

export default router;
