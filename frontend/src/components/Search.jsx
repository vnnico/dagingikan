import { BsSearch } from "react-icons/bs";

const Search = ({ placeholder }) => {
  return (
    <form action="" className="pt-5">
      <div className="container bg-white w-full max-md:w-full flex">
        <button className="text-black text-2xl mx-2" type="submit">
          <BsSearch></BsSearch>
        </button>
        <input
          type="text"
          className="flex-1 p-2 font-semibold border-none focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
};

export default Search;
