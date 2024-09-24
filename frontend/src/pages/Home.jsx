import ProductSection from "../sections/ProductSection";
import SearchSection from "../sections/SearchSection";
import { useQuery } from "react-query";
import { useState } from "react";
import Hero from "../components/Hero";
import * as fishAPI from "../api/fish";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const page = 1;
  const { search, searchItem } = useAppContext();
  const { data } = useQuery(["fishes", page, search], fishAPI.getAllFish);

  return (
    <>
      <Hero></Hero>
      <SearchSection searchItem={searchItem}></SearchSection>
      <ProductSection fishes={data}></ProductSection>
    </>
  );
};

export default Home;
