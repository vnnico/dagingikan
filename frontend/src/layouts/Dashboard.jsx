import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavList from "../components/admin/NavList";
import AdminHeader from "../components/admin/AdminHeader";

const Dashboard = ({ children }) => {
  const [isOpenSide, setIsOpenSide] = useState(false);

  const openSide = () => {
    setIsOpenSide(!isOpenSide);
  };
  return (
    <div className="flex">
      <div className="flex flex-col bg-slate-950 min-h-screen md:w-[300px] py-5 text-white">
        <h1 className="text-yellow-400 font-semibold text-2xl md:block hidden mb-3 px-2">
          dagingikan.com
        </h1>

        <div className="bg-slate-600 w-full h-[1px] md:block hidden "></div>

        <div className="p-2 w-[150px] md:block hidden">
          <NavList></NavList>
        </div>

        <button
          className="text-yellow-400 text-2xl md:hidden px-3"
          onClick={openSide}
        >
          <RxHamburgerMenu></RxHamburgerMenu>
        </button>
        {isOpenSide && (
          <div className="px-3 mt-4 w-[150px] md:hidden">
            <NavList></NavList>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        <AdminHeader></AdminHeader>
        <div className="h-screen flex p-12 ">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
