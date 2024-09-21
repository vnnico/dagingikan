import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const Add = () => {
  return (
    <div className=" flex flex-col">
      <h1 className="text-2xl font-semibold mb-3">Insert New Item</h1>
      <form>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="border border-black rounded"
            name="name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="weight">
            Weight
          </label>
          <input
            type="number"
            className="border border-black rounded"
            name="weight"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            className="border border-black rounded"
            name="price"
          />
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
                    name="file-upload"
                    type="file"
                    className="sr-only"
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
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
