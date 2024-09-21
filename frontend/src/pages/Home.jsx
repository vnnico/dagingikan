import ProductSection from "../sections/ProductSection";
import SearchSection from "../sections/SearchSection";
import Hero from "../components/Hero";
const Home = () => {
  return (
    <>
      <Hero></Hero>
      <SearchSection></SearchSection>
      <ProductSection></ProductSection>
    </>
  );
};

export default Home;
