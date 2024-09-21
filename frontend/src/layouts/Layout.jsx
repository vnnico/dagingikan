import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header></Header>
      <div className="flex-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
