import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewMessage } from "../../../store/messages";
import "./MessageInput.css";

const MessageInput = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const [messageContent, setMessageContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      content: messageContent,
    };

    let res = dispatch(createNewMessage(newMessage, channelId));

    if (res) {
      setMessageContent("");
      // history.push(`/servers/${serverId}/${channelId}`)
    }
  };

  return (
    <div className="message-input-container">
      <form className="create-message-form" onSubmit={handleSubmit}>
        <input
          className="message-content-input"
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Message"
          required
        />
        <button className="create-message-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
