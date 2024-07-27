import { Link } from "react-router-dom";
import { BsCardText, BsCart4, BsFillPersonFill } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import LogoutButton from "./LogoutButton";
import Cart from "../components/Cart";
import { useState } from "react";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [cart, setCart] = useState(false);

  const toggleCart = () => {
    setCart(!cart);
  };

  return (
    <div className="bg-gray-950 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-yellow-300  font-medium tracking-tight">
          <Link to="/">dagingikan.com</Link>
        </span>
        {/* adding spaces to child of span below for x-2 */}
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/sign-in"
                className="flex items-center text-3xl text-white px-3 font-bold hover:text-yellow-300 "
              >
                <BsCardText></BsCardText>
              </Link>
              <button
                className="flex items-center text-3xl text-white px-3 font-bold hover:text-yellow-300 "
                onClick={toggleCart}
              >
                <BsCart4></BsCart4>
              </button>
              <Link
                to="/profile"
                className="flex items-center text-3xl text-white px-3 font-bold hover:text-yellow-300 "
              >
                <BsFillPersonFill></BsFillPersonFill>
              </Link>
              <LogoutButton></LogoutButton>
            </>
          ) : (
            <Link
              to="/Login"
              className="flex items-center text-3xl text-white px-3 font-bold hover:text-yellow-300 "
            >
              <p className="text-3xl text-yellow-300 font-medium">Login</p>
            </Link>
          )}
        </span>
      </div>
      <Cart isOpen={cart} setOpen={setCart}></Cart>
    </div>
  );
};

export default Header;
