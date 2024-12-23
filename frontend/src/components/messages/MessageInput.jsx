import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="message-input-form">
      <div className="message-input-wrapper">
        <input
          type="text"
          placeholder="Send a message"
          className="message-input-field"
        />
        <button className="message-input-button">
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
