import { useMutation, useQueryClient } from "react-query";
import * as fishAPI from "../../api/fish";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import DeleteModal from "./DeleteModal";

const Table = ({ fishes, clickNext, clickPrev, page }) => {
  const [open, setOpen] = useState(false);
  const { showToast } = useAppContext();

  const queryClient = useQueryClient();

  const mutation = useMutation(fishAPI.deleteFish, {
    onSuccess: async () => {
      showToast({ message: "Successfully deleting the item", type: "SUCCESS" });
      queryClient.invalidateQueries("fishes");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const deleteItem = (id) => {
    if (confirm("Are you sure want to delete this product?") === true)
      mutation.mutate(id);
  };

  return (
    <div className="w-full mx-auto overflow-y-auto">
      <DeleteModal open={open} setOpen={setOpen}></DeleteModal>

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
            fishes && fishes.length === 0 ? "text-blue-300" : "text-blue-500"
          }`}
          onClick={clickNext}
          disabled={fishes && fishes.length === 0 ? true : false}
        >
          Next
        </button>
      </div>
      {fishes && fishes.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-t border-gray-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fishes &&
                  fishes.map((fish, index) => (
                    <tr key={index}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                        {index + 1 + (page - 1) * 10}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fish.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[200px]">
                        <div className="w-full h-full">
                          <img
                            src={`/images/${fish.image}`}
                            className="w-full bg-center bg-cover h-full"
                            alt={fish.name}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fish.stock ?? 10}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fish.weight}g
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fish.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium ">
                        <div className="flex gap-4">
                          <Link
                            to={`/admin/${fish._id}`}
                            className="text-yellow-500 hover:text-indigo-900"
                          >
                            Edit
                          </Link>

                          <button
                            className="text-red-600 hover:text-indigo-900"
                            onClick={() => deleteItem(fish._id)}
                          >
                            Delete
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

export default Table;
