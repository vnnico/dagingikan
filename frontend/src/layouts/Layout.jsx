import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBox from "../components/ChatBox";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative ">
      <Header></Header>
      <ChatBox></ChatBox>

      <div className="flex-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
