import { useEffect } from 'react';
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../store/messages';
import Message from '../Message/Message';
import MessageInput from '../MessageInput/MessageInput';
import './MessageList.css'


const MessageList = () => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  // console.log("SERVERID", serverId, "CHANNELID", channelId)
  const messages = useSelector(state => state.messages)
  const allMessagesList = [];

  useEffect(() => {
    dispatch(fetchMessages(channelId));
  }, [dispatch, channelId])

  for (let key in messages) {
    allMessagesList.push(messages[key]);
  }

  if (!messages) {
    return null;
  }



  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="channel-messages-container">
      <section className="all-messages">
        <ul className="allMessages">
          {
            allMessagesList.map(message => (
              <Message
                message={message}
                key={message.id}
              />
            ))
          }
        </ul>
      </section>
      <section className="messaging-functionality">
        <MessageInput />
      </section>
    </div>
  );
}

export default MessageList;
