import Table from "../../components/admin/Table";
import Search from "../../components/Search";

const View = () => {
  return (
    <div className="bg-slate-50 rounded-lg p-5 w-full flex flex-col">
      <h1 className="text-2xl font-semibold ">List of Products</h1>
      <Search placeholder="Cari item"></Search>
      <Table></Table>
    </div>
  );
};

export default View;
