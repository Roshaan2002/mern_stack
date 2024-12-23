import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form className="search-input-form">
      <input
        type="text"
        placeholder="Search..."
        className="search-input-chat"
      />
      <button className="search-input-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
