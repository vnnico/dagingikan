import { BsHouseDoorFill } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdChat } from "react-icons/md";

const NavList = () => {
  return (
    <div className="flex flex-col color-inherit gap-2 p-1">
      <Link className="flex gap-4" to="/admin">
        <BsHouseDoorFill className="mt-[7px]"></BsHouseDoorFill>
        <p className="text-lg">Home</p>
      </Link>
      <Link className="flex gap-4" to="/admin/create">
        <MdCreateNewFolder className="mt-[7px]"></MdCreateNewFolder>
        <p className="text-lg">Create</p>
      </Link>
      <Link className="flex gap-4" to="/admin/order">
        <FaClipboardList className="mt-[7px]"></FaClipboardList>
        <p className="text-lg">Order</p>
      </Link>
      <Link className="flex gap-4" to="/admin/chat">
        <MdChat className="mt-[7px]" />
        <p className="text-lg">Chat</p>
      </Link>
    </div>
  );
};

export default NavList;
