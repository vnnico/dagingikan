import { Link } from "react-router-dom";
import { BsCardText, BsCart4, BsFillPersonFill } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import LogoutButton from "./LogoutButton";
import Cart from "../components/Cart";
import { useState } from "react";

const Header = () => {
  const { isLoggedIn, toggleCart, carts } = useAppContext();

  return (
    <div className="bg-gray-950 py-6 md:text-3xl max-md:px-3 text-xl ">
      <div className="container mx-auto flex justify-between">
        <span className=" text-yellow-300  font-medium tracking-tight">
          <Link to="/">dagingikan.com</Link>
        </span>
        {/* adding spaces to child of span below for x-2 */}
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/sign-in"
                className="flex items-center  text-white px-3 font-bold hover:text-yellow-300 "
              >
                <BsCardText></BsCardText>
              </Link>
              <button
                className="flex items-center  text-white px-3 font-bold hover:text-yellow-300 relative "
                onClick={toggleCart}
              >
                <BsCart4></BsCart4>
                {carts && carts.length > 0 && (
                  <div className=" absolute top-0 right-1 text-xs flex">
                    <p className="bg-red-500 min-w-[16px] min-h-[13px] rounded ">
                      {carts.length}
                    </p>
                  </div>
                )}
              </button>
              <Link
                to="/profile"
                className="flex items-center  text-white px-3 font-bold hover:text-yellow-300 "
              >
                <BsFillPersonFill></BsFillPersonFill>
              </Link>
              <LogoutButton></LogoutButton>
            </>
          ) : (
            <Link
              to="/Login"
              className="flex items-center  text-white px-3 font-bold hover:text-yellow-300 "
            >
              <p className=" text-yellow-300 font-medium">Login</p>
            </Link>
          )}
        </span>
      </div>
      <Cart></Cart>
    </div>
  );
};

export default Header;
