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
// router.get("/:userId", verifyToken, orderControllers.getCustomerOrder);

/**
 * Get Order By Id
 */
router.get("/orderId", verifyToken, orderControllers.getOrder);

/**
 * Check Transaction Order Status
 */
router.get(
  "/check_order_status/:orderId",
  verifyToken,
  orderControllers.checkOrderStatus
);

/**
 * Get Transaction Notification
 */
router.post(
  "/transaction_notification",
  orderControllers.getTransactionNotification
);

/**
 * [ADMIN]
 * Delete Order
 */

export default router;
