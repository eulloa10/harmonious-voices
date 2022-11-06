import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAllMessages, fetchMessages } from "../../../store/messages";
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import "./MessageList.css";

const MessageList = () => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const messages = useSelector((state) => state.messages);
  const allMessagesList = [];

  useEffect(() => {
    dispatch(fetchMessages(channelId));
    dispatch(clearAllMessages());
  }, [dispatch, channelId]);

  for (let key in messages) {
    allMessagesList.push(messages[key]);
  }

  if (!messages) {
    return null;
  }

  // console.log('-----------ALL MESSAGES', allMessagesList)
  console.log("SERVERID", serverId);
  console.log("CHANNELID", channelId);

  return (
    <>
      {channelId && (
        <div className="channel-messages-container">
          <ul className="all-messages">
            {allMessagesList.map((message) => (
              <Message message={message} key={message.id} />
            ))}
          </ul>
          <section className="messaging-functionality">
            <MessageInput />
          </section>
        </div>
      )}
    </>
  );
};

export default MessageList;
