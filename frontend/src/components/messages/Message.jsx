import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthChatContext } from "../../context/authChatContext";

const Message = ({ message }) => {
  const { authUser } = useAuthChatContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  return (
    <div className="message">
      <div className="message-avatar"></div>
      <div className="message-content">Hi! What's up</div>
      <div className="message-time">12:24</div>
    </div>
  );
};

export default Message;
