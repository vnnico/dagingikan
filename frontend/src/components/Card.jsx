import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

const Card = ({ fish }) => {
  const { addCart, toggleCart, toggleModal, isLoggedIn } = useAppContext();

  return (
    <div className="flex flex-col container border-2 rounded-2xl w-full overflow-hidden cursor-pointer ">
      <Link className="container w-full h-[57%]" to={`/${fish._id}`}>
        <div className="w-full h-full">
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
        </div>
      </Link>
      <button
        className="container flex border-2 rounded-lg  text-center justify-center gap-2 mt-5 mb-2 md:py-2 lg:mb-2 hover:shadow-md font-semibold mt-auto"
        onClick={
          isLoggedIn
            ? () => addCart({ ...fish, id: fish._id }, toggleCart)
            : () => toggleModal()
        }
      >
        <BsCart4 className="text-lg mt-1"></BsCart4>
        <p className="md:text-lg text-md">Add to Cart</p>
      </button>
    </div>
  );
};

export default Card;
