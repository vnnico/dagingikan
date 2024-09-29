import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserPage = ({ children }) => {
  const { auth, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.userRole !== "user") navigate("*");
    if (auth && auth.userRole === "admin") navigate("/admin");
  }, [auth, isLoading]);

  if (isLoading) return <div>tunggu...</div>;

  if (!auth || auth.userRole === "user") {
    return children;
  }

  return null;
};

export default UserPage;
