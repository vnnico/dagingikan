import { PhotoIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as fishAPI from "../../api/fish";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation(fishAPI.addFish, {
    onSuccess: async () => {
      showToast({ message: "Successfully adding new item", type: "SUCCESS" });
      navigate("/admin");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const postData = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className=" flex flex-col">
      <h1 className="text-2xl font-semibold mb-3">Insert New Item</h1>
      <form onSubmit={handleSubmit(postData)} encType="multipart/form-data">
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-black rounded"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="weight">
            Weight
          </label>
          <input
            type="number"
            id="weight"
            placeholder="Weight"
            className="border border-black rounded"
            {...register("weight", {
              required: "Weight is required",
            })}
          />
          {errors.weight && (
            <span className="text-red-500">{errors.weight.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            className="border border-black rounded"
            {...register("price", {
              required: "Price is required",
            })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-300"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    {...register("image", {
                      required: "Image is required",
                    })}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="p-2 my-4 bg-blue-500 w-full text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
