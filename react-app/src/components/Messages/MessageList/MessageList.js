import { useEffect } from 'react';
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../store/messages';
import Message from '../Message/Message';
import './MessageList.css'


const MessageList = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const messages = useSelector(state => state.messages)
  const allMessagesList = [];
  console.log("MESSAGES", messages)
  console.log("CHANNELID", channelId)

  useEffect(() => {
    dispatch(fetchMessages(channelId));
  }, [dispatch])

  for (let key in messages) {
    allMessagesList.push(messages[key]);
  }

  if (!messages) {
    return null;
  }

  return (
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
  );
}

export default MessageList;
