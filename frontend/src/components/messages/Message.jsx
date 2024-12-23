import React from "react";
import { useAuth } from "../../store/auth";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuth();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  return (
    <div className="message">
      <div className="message-avatar"></div>
      <div className="message-content">Hi! What's up</div>
      <div className="message-time">12:24</div>
    </div>
  );
};

export default Message;
