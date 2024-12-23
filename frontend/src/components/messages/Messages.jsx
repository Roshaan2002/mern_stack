import React from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages", messages);
  return (
    <div className="messages">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p style={{ color: "#666", textAlign: "center" }}>
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
