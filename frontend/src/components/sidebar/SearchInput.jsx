import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import { toast } from "react-toastify";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }

    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="search-input-form">
      <input
        type="text"
        placeholder="Search..."
        className="search-input-chat"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-input-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
