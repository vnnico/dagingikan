import midtransClient from "midtrans-client";
import Order from "../models/order.js";

export const checkTransactionNotification = async (notificationJSON) => {
  const apiClient = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY,
  });

  const statusResponse = await apiClient.transaction.notification(
    notificationJSON
  );
  const transactionStatus = await statusResponse.transaction_status;
  const transactionId = await statusResponse.transaction_id;
  const channel = await statusResponse.payment_type;

  const order = await Order.findOne({ transactionId: transactionId });

  if (transactionStatus === "settlement") {
    order.channel = channel;
    order.status = "settlement";
  } else if (transactionStatus === "cancel" || transactionStatus === "expire") {
    order.channel = channel;
    order.status = "failure";
  } else if (transactionStatus === "pending") {
    order.channel = channel;
    order.status = "pending";
  } else if (transactionStatus === "expire") {
    // Remove Expired Order in 24h
    order.channel = channel;
    order.status = "expire";
  } else if (transactionStatus === "cancel") {
    // Remove Cancel Order in 24h
    order.channel = channel;
    order.status = "cancel";
  }

  await order.save();
};
