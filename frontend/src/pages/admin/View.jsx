import { Link } from "react-router-dom";
import Table from "../../components/admin/Table";
import Search from "../../components/Search";
import * as fishAPI from "../../api/fish";
import { useQuery } from "react-query";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const View = () => {
  const [page, setPage] = useState(1);
  const { search, searchItem } = useAppContext();
  const { data } = useQuery(["fishes", page, search], fishAPI.getAllFish);

  const clickNext = () => {
    setPage(page + 1);
  };
  const clickPrev = () => {
    setPage(page - 1);
  };

  return (
    <div className="bg-slate-50 rounded-lg p-5 w-full flex flex-col gap-3 ">
      <h1 className="text-2xl font-semibold ">List of Products</h1>
      <Search placeholder="Search item" searchItem={searchItem}></Search>
      <Link
        className="bg-blue-500 text-white rounded-lg py-2  w-[200px] "
        to="/admin/create"
      >
        <p className="text-md text-center">Add new product</p>
      </Link>
      <Table
        fishes={data}
        clickNext={clickNext}
        clickPrev={clickPrev}
        page={page}
      ></Table>
    </div>
  );
};

export default View;
