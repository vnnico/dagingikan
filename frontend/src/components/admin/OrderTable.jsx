import { useMutation, useQueryClient } from "react-query";
import * as fishAPI from "../../api/fish";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ItemsModal from "./ItemsModal";

const OrderTable = ({ orders, clickNext, clickPrev, page }) => {
  const [open, setOpen] = useState(false);
  const { showToast, setModalItems } = useAppContext();

  const queryClient = useQueryClient();

  const viewItems = (items) => {
    setModalItems(items);
    setOpen(true);
  };

  return (
    <div className="w-full mx-auto overflow-y-auto h-full">
      <ItemsModal open={open} setOpen={setOpen}></ItemsModal>

      <div className="flex gap-3 mb-3">
        <button
          className={`text-md text-blue-500 ${
            page === 1 ? "text-blue-300" : "text-blue-500"
          }`}
          disabled={page === 1 ? true : false}
          onClick={clickPrev}
        >
          Prev
        </button>
        <button
          className={`text-md text-blue-500 ${
            orders && orders.length === 0 ? "text-blue-300" : "text-blue-500"
          }`}
          onClick={clickNext}
          disabled={orders && orders.length === 0 ? true : false}
        >
          Next
        </button>
      </div>
      {orders && orders.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
          <div className="border-t border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    OrderID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TransactionID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {orders &&
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                        {order._id}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.transactionId}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.user.username}
                      </td>
                      {order.status === "settlement" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white bg-green-600">
                          {order.status}
                        </td>
                      )}
                      {order.status === "failure" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white bg-red-500">
                          {order.status}
                        </td>
                      )}
                      {order.status === "pending" && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white bg-yellow-400">
                          {order.status}
                        </td>
                      )}

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date.substring(0, 10)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium ">
                        <div className="flex gap-4">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => viewItems(order.items)}
                          >
                            View Items
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex   ">
          <h1 className="text-xl m-auto">
            You have reached the end of the list.
          </h1>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
