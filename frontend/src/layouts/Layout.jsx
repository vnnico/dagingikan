import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header></Header>
      <Hero></Hero>
      {/* flex-1 akan membuat bagian container memenuhi semua space kosong yang available */}
      <div className="flex-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
