import React from "react";
import SideBar from "../components/sidebar/SideBar";
import MessageContainer from "../components/messages/MessageContainer";

const Chat = () => {
  return (
    <div className="app-container">
      <SideBar />
      <MessageContainer />
    </div>
  );
};

export default Chat;
