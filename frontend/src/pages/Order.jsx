import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as orderAPI from "../api/order";
import { useQuery } from "react-query";
import { countdownTime } from "../utils/countdownTime";

const Order = () => {
  const { orderId } = useParams();
  const { data: orderStatus } = useQuery(
    ["orderId", orderId],
    orderAPI.getOrderStatus
  );

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(
    countdownTime(orderStatus?.expiryDate)
  );

  useEffect(() => {
    if (orderStatus && orderStatus.status === "pending") {
      const timer = setInterval(() => {
        setTimeLeft(countdownTime(orderStatus.expiryDate));
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(timer);
    }
  }, [orderStatus]);

  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }

  return (
    <div className="container mx-auto my-4 py-5 max-md:px-3  ">
      <div className="w-[80%] md:w-[50%] m-auto bg-slate-950 rounded-lg border">
        <h1 className="text-xl lg:text-2xl  text-center text-yellow-300 font-medium py-2">
          Order Status
        </h1>
        {orderStatus && (
          <>
            <div className="p-4 bg-white  ">
              <div className="flex flex-col border border-slate-400 p-4 gap-2 rounded-lg ">
                <div>
                  <p className="text-xs lg:text-lg font-bold">
                    Transaction ID{" "}
                  </p>
                  <p className="text-xs lg:text-lg">
                    {orderStatus.transactionId}
                  </p>
                </div>

                <div>
                  <p className="text-xs lg:text-lg font-bold">Customer Name </p>
                  <p className="text-xs lg:text-lg">{orderStatus.customer}</p>
                </div>

                <div>
                  <p className="text-xs lg:text-lg font-bold">
                    Payment Method{" "}
                  </p>
                  <p className="text-xs lg:text-lg">
                    {`BCA Virtual Account : ${orderStatus.vaNumbers}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs lg:text-lg font-bold">Status </p>
                  {orderStatus.status === "settlement" && (
                    <p className="text-xs lg:text-lg text-green-500">Success</p>
                  )}
                  {orderStatus.status === "pending" && (
                    <p className="text-xs lg:text-lg text-yellow-500">
                      Pending
                    </p>
                  )}
                  {orderStatus.status === "failed" && (
                    <p className="text-xs lg:text-lg text-green-500">Failed</p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-0 p-4 bg-white ">
              <div className="flex flex-col border border-slate-400 p-4 gap-2 rounded-lg ">
                {orderStatus.items.map((item, index) => (
                  <div
                    className="flex gap-2 justify-between flex-wrap"
                    key={index}
                  >
                    <p className="text-xs lg:text-lg font-bold flex-none">
                      {item.quantity}
                    </p>
                    <p className="text-xs  lg:text-lg flex-initial">
                      {item.name}
                    </p>
                    <p className="text-xs lg:text-lg flex-none">
                      {item.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                ))}
                <span className="flex gap-2 ">
                  <p className="text-sm lg:text-lg font-bold text-start">
                    Total :{" "}
                  </p>
                  <p className="text-sm lg:text-lg font-bold ms-auto ">
                    {orderStatus.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </span>
              </div>
            </div>
            <div className="pt-0 p-4 bg-white rounded-br-lg rounded-bl-lg ">
              <div className="flex flex-col gap-2  ">
                {orderStatus.status === "pending" && (
                  <p className="text-xs lg:text-md">{`Payment Countdown : ${formatNumber(
                    timeLeft.hours
                  )}:${formatNumber(timeLeft.minutes)}:${formatNumber(
                    timeLeft.seconds
                  )}`}</p>
                )}
                <button
                  className="bg-slate-950 text-yellow-300 rounded-md font-semibold text-lg"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
