import fetch from "node-fetch";
import base64 from "base-64";
import midtransClient from "midtrans-client";
import crypto from "crypto";

import Order from "../models/order.js";
import User from "../models/user.js";

import { checkTransactionNotification } from "../utils/checkTransactionNotification.js";

// console.log(process.env.SERVER_KEY); return undefined karena dipanggil sebelum variable env sepenuhnya di load di lingkungan asynchronous.

export const orderFish = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const order = new Order({
      user,
      amount: body.amount,
      items: body.items,
    });

    const token = base64.encode(`${process.env.SERVER_KEY}:`);
    const response = await fetch(process.env.PAYMENT_API, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: order._id,
          gross_amount: order.amount,
          item_details: order.items,
        },
        credit_card: { secure: true },
      }),
    });

    const responseBody = await response.json();
    if (!response.ok) {
      throw new Error(responseBody.error_messages);
    }

    await order.save();
    return res.status(201).json({
      message: "Order Created",
      token: responseBody.token,
      redirectUrl: responseBody.redirect_url,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { amount, items } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    const transaction = await core.charge({
      payment_type: "bank_transfer",
      bank_transfer: {
        bank: "bca",
      },
      transaction_details: {
        gross_amount: amount,
        order_id: "order-id-node-" + Math.round(new Date().getTime() / 1000),
      },
      item_details: items,
    });

    const order = new Order({
      transactionId: transaction.transaction_id,
      amount: amount,
      items: items,
      user: user,
    });
    await order.save();

    return res
      .status(200)
      .json({ data: transaction, clientKey: core.apiConfig.clientKey });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Order Failed", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    return res.json({});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch", error: error.message });
  }
};

export const getCustomerOrder = async (req, res) => {
  try {
    return res.json({});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch", error: error.message });
  }
};

export const checkTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    const transactionStatus = await core.transaction.status(transactionId);
    return res.status(200).json(transactionStatus);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getTransactionNotification = async (req, res) => {
  try {
    const notificationJSON = req.body;
    const { signature_key, order_id, status_code, gross_amount } =
      notificationJSON;

    const hash = crypto
      .createHash("sha512")
      .update(
        order_id + status_code + gross_amount + process.env.SERVER_KEY,
        "utf-8"
      )
      .digest("hex");

    const isVerified = signature_key === hash;

    if (isVerified) await checkTransactionNotification(notificationJSON);

    return res.status(200).json({ message: "Success sending notification" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed sending notification", error: error.message });
  }
};
