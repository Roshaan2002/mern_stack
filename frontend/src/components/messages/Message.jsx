import useConversation from "../../zustand/useConversation";
import { useAuthChatContext } from "../../context/authChatContext";
import { extractTime } from "../../utils/ExtractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthChatContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleStyle = fromMe
    ? { backgroundColor: "#0073ed", color: "#fff" }
    : { backgroundColor: "#000", color: "#fff" };

  return (
    <div className={`message ${chatClassName}`}>
      <div className="message-avatar">
        <img
          src={profilePic || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
          alt="Profile Image"
        />
      </div>

      <div className={`message-content ${bubbleStyle}`}>{message.message}</div>

      <div className="message-time">{formattedTime}</div>
    </div>
  );
};

export default Message;
