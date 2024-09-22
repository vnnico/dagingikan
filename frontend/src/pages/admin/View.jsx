import { Link } from "react-router-dom";
import Table from "../../components/admin/Table";
import Search from "../../components/Search";

const View = () => {
  return (
    <div className="bg-slate-50 rounded-lg p-5 w-full flex flex-col">
      <h1 className="text-2xl font-semibold ">List of Products</h1>
      <Search placeholder="Cari item"></Search>
      <Link
        className="bg-blue-500 text-white rounded-lg py-2 my-3 w-[200px] "
        to="/admin/create"
      >
        <p className="text-md text-center">Add new product</p>
      </Link>
      <Table></Table>
    </div>
  );
};

export default View;
