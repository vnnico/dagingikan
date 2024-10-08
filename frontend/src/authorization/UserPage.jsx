import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserPage = ({ children }) => {
  const { auth, isLoading, isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
    if (auth && auth.userRole !== "user") navigate("*");
    if (auth && auth.userRole === "admin") navigate("/admin");
  }, [auth, isLoading, isLoggedIn]);

  if (isLoading) return <div>tunggu...</div>;

  if (!auth || (auth.userRole === "user" && isLoggedIn)) {
    return children;
  }

  return null;
};

export default UserPage;
