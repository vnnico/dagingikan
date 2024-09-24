import Search from "../components/Search";

const SearchSection = ({ searchItem }) => {
  return (
    <div className="bg-yellow-300 pb-7  max-md:px-3">
      <div className="container mx-auto">
        <Search
          placeholder="Cari daging disini"
          searchItem={searchItem}
        ></Search>
      </div>
    </div>
  );
};

export default SearchSection;
