import React from "react";
import "./SideBar.css";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIbx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        className={`sidebar-conversation ${isSelected ? "selected" : ""}`}
        style={{
          backgroundColor: isSelected ? "#333" : "#242424",
        }}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="sidebar-data">
          <div className="sidebar-names">
            <p className="conversation-username">{conversation.username}</p>
            <span className="conversation-emoji">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIbx && <div className="divider" />}
    </>
  );
};

export default Conversation;
