import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

const Card = ({ fish }) => {
  return (
    <div className="container border-2 rounded-2xl w-full overflow-hidden cursor-pointer">
      <div className="container w-full h-3/5">
        <img
          src={`/images/${fish.image}`}
          class="w-full bg-center bg-cover h-full"
          alt={fish.name}
        />
      </div>
      <div className="p-2">
        <p className="text-2xl text-black">{fish.name}</p>
        <p className="text-1xl text-gray-500">{fish.weight}g</p>
        <p className="text-1xl text-red-700 font-bold">Rp.{fish.price}</p>
        {/*  bikin jadi goyang cartnya kalo dihover */}
        <div className="container flex border-2 rounded-lg  text-center ">
          <Link
            to="/carts"
            className="flex text-1xl font-bold text-black  hover:text-yellow-300 "
          >
            <BsCart4 className="hidden"></BsCart4>
            <p className="text-1xl text-black">Add to Cart</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
