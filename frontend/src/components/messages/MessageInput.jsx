import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="message-input-form" onSubmit={handleOnSubmit}>
      <div className="message-input-wrapper">
        <input
          type="text"
          placeholder="Send a message"
          className="message-input-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="message-input-button">
          {loading ? <div>loading...</div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
