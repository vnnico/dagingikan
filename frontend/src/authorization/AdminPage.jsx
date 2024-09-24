import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminPage = ({ children }) => {
  const { auth, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || auth.userRole !== "admin") navigate("*");
  }, [auth]);

  if (isLoading) return <div>tunggu...</div>;

  if (auth.userRole === "admin") {
    return children;
  }

  return null;
};

export default AdminPage;
