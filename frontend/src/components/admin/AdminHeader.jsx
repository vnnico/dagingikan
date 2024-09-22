import LogoutButton from "../LogoutButton";

const AdminHeader = () => {
  return (
    <div className="py-4 bg-zinc-950 flex">
      <p className="text-2xl text-white px-16">Inventory Management System</p>
      <span className="ms-auto">
        <LogoutButton></LogoutButton>
      </span>
    </div>
  );
};

export default AdminHeader;
