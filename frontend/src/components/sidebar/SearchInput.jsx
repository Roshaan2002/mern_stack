import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        className="search-input-chat"
      />
      <button className="">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
