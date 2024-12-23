import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessage } from "react-icons/ti";
import "./Messages.css";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="message-container">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="message-header">
            <span>To: </span>
            <span className="message-recipient">
              {selectedConversation.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="no-chat-selected">
      <div>
        <p className="welcome-message">Welcome Roshaan Maqsood</p>
        <p className="select-chat-message">
          Select the Chat to start the messaging
        </p>
        <TiMessage className="message-icon" />
      </div>
    </div>
  );
};
