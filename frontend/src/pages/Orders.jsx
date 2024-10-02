import { LiaClock } from "react-icons/lia";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as orderAPI from "../api/order";
import { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const { data: orders, isLoading } = useQuery(
    ["orders", page],
    orderAPI.getOrders
  );

  const clickNext = () => {
    setPage(page + 1);
  };
  const clickPrev = () => {
    setPage(page - 1);
  };

  if (isLoading) return <div>tunggu</div>;
  return (
    <div className="container mx-auto my-4 py-5 max-md:px-3 ">
      <div className="w-[90%] md:w-[45%] m-auto flex flex-col gap-3 ">
        <h1 className="md:text-3xl text-2xl text-center font-semibold">
          List of Orders
        </h1>
        {orders &&
          orders.map((order, index) => (
            <div
              className="flex h-[150px] w-full border-2 p-3 rounded-lg gap-2 "
              key={index}
            >
              <div className="lg:w-[240px] w-1/2 ">
                <img
                  src="images\kepala-salmon.jpg"
                  className="w-full bg-auto rounded-lg h-full "
                  alt=""
                />
              </div>
              <div className="flex flex-col ">
                <p className="text-sm lg:text-lg  font-semibold">{order._id}</p>
                {order.status === "pending" && (
                  <div className="flex gap-1 text-center text-yellow-500">
                    <p className="text-sm lg:text-md mt-1   ">
                      <LiaClock />
                    </p>
                    <p className="text-sm lg:text-md font-semibold">
                      {order.status}
                    </p>
                  </div>
                )}
                {order.status === "settlement" && (
                  <div className="flex gap-1 text-center text-green-500">
                    <p className="text-sm lg:text-md mt-1   ">
                      <LiaClock />
                    </p>
                    <p className="text-sm lg:text-md font-semibold">
                      {order.status}
                    </p>
                  </div>
                )}
                {order.status === "failed" && (
                  <div className="flex gap-1 text-center text-red-500">
                    <p className="text-sm lg:text-md mt-1   ">
                      <LiaClock />
                    </p>
                    <p className="text-sm lg:text-md font-semibold">
                      {order.status}
                    </p>
                  </div>
                )}
                <p className="text-sm lg:text-md font-semibold ">
                  {order.amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
                <Link
                  className="text-md bg-slate-950 text-yellow-400 mt-4 rounded-md block text-center py-1"
                  to={`/order/${order._id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        <div className="flex mx-auto gap-3 mb-3">
          <button
            className={`text-md bg-slate-950  px-3 rounded-md py-1 text-yellow-300 ${
              page === 1 ? "text-yellow-100" : "text-yellow-300"
            } `}
            disabled={page === 1 ? true : false}
            onClick={clickPrev}
          >
            Prev
          </button>
          <button
            className={`text-md bg-slate-950 px-3 rounded-md py-1 text-yellow-300 ${
              orders && orders.length === 0 ? "text-blue-300" : "text-blue-500"
            }`}
            onClick={clickNext}
            disabled={orders && orders.length === 0 ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
