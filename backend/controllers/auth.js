import { validationResult } from "express-validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ message: errors.array() });
    }

    const body = req.body;
    if (body.username === "admin") body.role = "admin";

    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser.id, userRole: newUser.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
      httpOnly: true,
    });

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = bcrypt.compare(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { userId: user.id, userRole: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    res.status(200).json({ userId: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch", error: error.message });
  }
};

export const validateToken = async (req, res) => {
  return res.status(200).json({ userId: req.userId, userRole: req.userRole });
};

export const logout = async (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.status(200).json({ message: "Logout success" });
};
