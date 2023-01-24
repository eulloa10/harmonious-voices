import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAllMessages, fetchMessages } from "../../../store/messages";
import { io } from "socket.io-client";
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import "./MessageList.css";

let socket;

const MessageList = () => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const messages = Object.values(useSelector((state) => state.messages));
  const [socketMessages, setSocketMessages] = useState([]);
  const [prevRoom, setPrevRoom] = useState(`message${channelId}`);
  const [currRoom, setCurrRoom] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const allMessagesList = [];

  useEffect(() => {
    dispatch(fetchMessages(channelId)).then((messages) =>
      setSocketMessages(messages)
    );
    dispatch(clearAllMessages());

    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("message", (chat) => {
      setSocketMessages((messages) => [...messages, chat.newMessage]);
    });

    setCurrRoom(`message${channelId}`);

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [dispatch, channelId]);

  useEffect(() => {
    const joinRoom = (room) => {
      socket.emit("join_room", { room: currRoom });
    };

    const leaveRoom = (room) => {
      socket.emit("leave_room", { room: prevRoom });
    };

    if (isLoaded) {
      leaveRoom(prevRoom);
      joinRoom(currRoom);

      setPrevRoom(currRoom);
    }

    setIsLoaded(true);

    return () => setIsLoaded(false);
  }, [prevRoom, currRoom, isLoaded]);

  if (!messages) {
    return null;
  }

  return (
    <>
      {channelId && (
        <div className="channel-messages-container">
          <ul className="all-messages">
            {socketMessages.map((message) => (
              <Message message={message} key={message.id} />
            ))}
          </ul>
          <section className="messaging-functionality">
            <MessageInput socket={socket} currRoom={currRoom} />
          </section>
        </div>
      )}
    </>
  );
};

export default MessageList;
