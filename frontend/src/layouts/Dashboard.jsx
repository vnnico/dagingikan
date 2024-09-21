import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavList from "../components/admin/NavList";

const Dashboard = ({ children }) => {
  const [isOpenSide, setIsOpenSide] = useState(false);

  const openSide = () => {
    setIsOpenSide(!isOpenSide);
  };
  return (
    <div className="flex">
      <div className="flex flex-col bg-slate-950 min-h-screen md:w-[300px] p-5 text-white">
        <h1 className="text-yellow-400 font-semibold text-2xl md:block hidden mb-3">
          dagingikan.com
        </h1>

        <div className="py-3 w-[150px] md:block hidden">
          <NavList></NavList>
        </div>

        <button
          className="text-yellow-400 text-2xl md:hidden"
          onClick={openSide}
        >
          <RxHamburgerMenu></RxHamburgerMenu>
        </button>
        {isOpenSide && (
          <div className="py-3 w-[150px] md:hidden">
            <NavList></NavList>
          </div>
        )}
      </div>
      <div className="w-full p-5 ">
        <div className=" h-full flex ">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
