import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { register, login, logout, validateToken } from "../controllers/auth.js";
import { body } from "express-validator";
import isNotAuthenticate from "../middleware/isNotAuthenticate.js";
const router = express.Router();

router.post(
  "/register",
  isNotAuthenticate,
  [
    body("username").notEmpty().withMessage("Username is required"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email"),

    body("password")
      .isStrongPassword({
        minLength: 6,
      })
      .withMessage("Password must be at least 6 characters")
      .notEmpty()
      .withMessage("Password is required"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("id-ID")
      .withMessage("Invalid phone number format for Indonesia"),
    body("address").notEmpty().withMessage("Address is required"),
  ],
  register
);

router.post(
  "/login",
  isNotAuthenticate,
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email"),

    body("password")
      .isStrongPassword({
        minLength: 6,
      })
      .withMessage("Password must be at least 6 characters")
      .notEmpty()
      .withMessage("Password is required"),
  ],
  login
);

router.post("/logout", verifyToken, logout);
router.get("/validateToken", verifyToken, validateToken);

export default router;
