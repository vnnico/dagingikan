import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

const Card = ({ fish }) => {
  const { addCart, toggleCart } = useAppContext();
  return (
    <div className="container border-2 rounded-2xl w-full overflow-hidden cursor-pointer ">
      <div className="container w-full h-3/5 ">
        <img
          src={`/images/${fish.image}`}
          className="w-full bg-center bg-cover h-full"
          alt={fish.name}
        />
      </div>
      <div className="p-2 flex flex-col">
        <p className="md:text-xl text-lg text-black">{fish.name}</p>
        <p className="md:text-lg text-md text-gray-500">{fish.weight}g</p>
        <p className="md:text-lg text-md text-red-700 font-bold">
          {fish.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        {/*  bikin jadi goyang cartnya kalo dihover */}
        <button
          className="container flex border-2 rounded-lg  text-center justify-center gap-2 mt-2 mb-2 md:py-2 mb-12 lg:mb-2 hover:shadow-md font-semibold"
          onClick={() => addCart({ ...fish, id: fish._id }, toggleCart)}
        >
          <BsCart4 className="text-lg mt-1"></BsCart4>
          <p className="md:text-lg text-md">Add to Cart</p>
        </button>
      </div>
    </div>
  );
};

export default Card;
