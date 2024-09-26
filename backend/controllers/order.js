import fetch from "node-fetch";
import base64 from "base-64";
import Order from "../models/order.js";
import User from "../models/user.js";

export const orderFish = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(body);
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
