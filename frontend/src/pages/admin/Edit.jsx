import { PhotoIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as fishAPI from "../../api/fish";
import { useAppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { fishId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { data, isLoading } = useQuery(["fish", fishId], fishAPI.getFish);

  const mutation = useMutation(fishAPI.editFish, {
    onSuccess: async () => {
      showToast({ message: "Successfully adding new item", type: "SUCCESS" });
      queryClient.invalidateQueries("fish");
      navigate("/admin");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const postData = (data) => {
    mutation.mutate({ ...data, id: fishId });
  };

  if (isLoading) return <div>Please wait...</div>;
  return (
    <div className=" flex flex-col">
      <h1 className="text-2xl font-semibold mb-3">
        Edit <span className="font-bold">{data.fish.name}</span>
      </h1>
      <form onSubmit={handleSubmit(postData)}>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-black rounded"
            placeholder="Name"
            defaultValue={data.fish.name}
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
            defaultValue={data.fish.weight}
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
            defaultValue={data.fish.price}
            className="border border-black rounded"
            {...register("price", {
              required: "Price is required",
            })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>
        <div className="col-span-full py-2">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="w-[400px] h-full">
            <img
              src={`/images/${data.fish.image}`}
              className="w-full bg-center bg-cover h-full"
              alt={data.fish.name}
            />
          </div>
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
                    {...register("image")}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="p-2 my-4 bg-blue-500 w-full text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
