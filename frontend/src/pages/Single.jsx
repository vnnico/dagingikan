import * as fishAPI from "../api/fish";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { BsCart4 } from "react-icons/bs";

const Single = () => {
  const { fishId } = useParams();
  const { data } = useQuery(["fish", fishId], fishAPI.getFish);
  const { addCart, toggleCart, toggleModal, isLoggedIn } = useAppContext();
  return (
    <div className="container mx-auto py-5 bg-white max-md:px-3 ">
      <div className="flex flex-col container py-2 justify-center gap-4 md:h-[600px] h-full">
        {data && data.fish && (
          <>
            <div className="flex gap-3  w-full max-md:flex-col py-2 h-full ">
              <div className="flex-1  w-full h-[90%]">
                <img
                  src={`/images/${data.fish.image}`}
                  className="w-full bg-center bg-cover h-full"
                  alt={data.fish.name}
                />
              </div>
              <div className="px-2 flex-col flex-1 h-[94%] ">
                <div className="md:py-3 flex flex-col h-full gap-2">
                  <p className="md:text-3xl text-lg font-bold">
                    {data.fish.name}
                  </p>
                  <p className="md:text-lg text-md text-gray-500">
                    {data.fish.weight}g
                  </p>
                  <p className="md:text-lg text-md text-gray-500 overflow-y-auto flex-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio, itaque? Esse, aliquid vel? Illum fugit earum, quidem
                    voluptas, eaque eveniet ipsa amet quisquam ut dicta id
                    laudantium accusantium labore veritatis. Numquam Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Odio, itaque?
                    Esse, aliquid vel? Illum fugit earum, quidem voluptas, eaque
                    eveniet ipsa amet quisquam ut dicta id laudantium
                    accusantium labore veritatis. Numquam Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Odio, itaque? Esse,
                    aliquid vel? Illum fugit earum, quidem voluptas, eaque
                    eveniet ipsa amet quisquam ut dicta id laudantium
                    accusantium labore veritatis. Numquam amet consectetur
                    adipisicing elit. Odio, itaque? Esse, aliquid vel? Illum
                    fugit earum, quidem voluptas, eaque eveniet ipsa amet
                    quisquam ut dicta id laudantium accusantium labore
                    veritatis. Numquam amet consectetur adipisicing elit. Odio,
                    itaque? Esse, aliquid vel? Illum fugit earum, quidem
                    voluptas, eaque eveniet ipsa amet quisquam ut dicta id
                    laudantium accusantium labore veritatis. Numquam
                  </p>
                  <p className="md:text-lg text-md text-red-700 font-bold">
                    {data.fish.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                  <button
                    className="container flex border-2 rounded-lg  text-center justify-center gap-2 mt-2 mb-2 md:py-2 mb-1 lg:mb-2 hover:shadow-md font-semibold"
                    onClick={
                      isLoggedIn
                        ? () =>
                            addCart(
                              { ...data.fish, id: data.fish._id },
                              toggleCart
                            )
                        : () => toggleModal()
                    }
                  >
                    <BsCart4 className="text-lg mt-1"></BsCart4>
                    <p className="md:text-lg text-md">Add to Cart</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container flex max-md:ms-2 mb-2">
        <p className="md:text-3xl text-lg font-bold ">Comments</p>
      </div>
    </div>
  );
};

export default Single;
