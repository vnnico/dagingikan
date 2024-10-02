import Search from "../../components/Search";
import * as orderAPI from "../../api/order";
import { useQuery } from "react-query";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import OrderTable from "../../components/admin/OrderTable";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const { search, searchItem } = useAppContext();
  const { data } = useQuery(["allOrders", page, search], orderAPI.getAllOrders);

  const clickNext = () => {
    setPage(page + 1);
  };
  const clickPrev = () => {
    setPage(page - 1);
  };

  return (
    <div className="bg-slate-50 rounded-lg p-5 w-full flex flex-col gap-3 h-full ">
      <h1 className="text-2xl font-semibold ">List of Orders</h1>
      <Search placeholder="Search item" searchItem={searchItem}></Search>

      <OrderTable
        orders={data}
        clickNext={clickNext}
        clickPrev={clickPrev}
        page={page}
      ></OrderTable>
    </div>
  );
};

export default AdminOrder;
