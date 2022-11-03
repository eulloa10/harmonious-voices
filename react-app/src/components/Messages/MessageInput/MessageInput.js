import { useEffect, useState } from 'react';
import {  useParams, useHistory, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createNewMessage  } from '../../../store/messages';
import './MessageInput.css'

const MessageInput = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {channelId, serverId} = useParams();
  const current_user = useSelector(state => state.session)['user']
  const [messageContent, setMessageContent] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      content: messageContent
    };

    let res = await dispatch(createNewMessage(newMessage, channelId))
    .catch(async (res) => {
      const data = await res.json();
      // if (data.errors) setErrors({...data.errors})

    });

    if (res) {
      setMessageContent('')
      // history.push(`/servers/${serverId}/${channelId}`)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
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
        <button className="create-message-btn" type="submit">Send</button>

      </form>
    </div>
  );
}

export default MessageInput;
