import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar-container">
      <SearchInput />
      <div className="sidebar-divider"></div>
      <Conversations />
    </div>
  );
};

export default SideBar;
