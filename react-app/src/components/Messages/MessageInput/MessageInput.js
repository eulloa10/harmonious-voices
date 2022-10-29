import { useEffect, useState } from 'react';
import {  useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createNewMessage  } from '../../../store/messages';
import './MessageInput.css'

const MessageInput = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const current_user = useSelector(state => state.session)['user']
  const { channelId } = useParams();
  const [messageContent, setMessageContent] = useState('');
  // const [errors, setErrors] = useState({});
  // console.log(current_user.id)

  // useEffect(() => {
  //   dispatch(createNewMessage(messageContent, channelId));
  // }, [dispatch])

  // if (!messages) {
  //   return null;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(messageContent)
    const newMessage = {
      content: messageContent
    };

    let res = await dispatch(createNewMessage(newMessage, channelId))
    .catch(async (res) => {
      const data = await res.json();
      // if (data.errors) setErrors({...data.errors})

    });

    if (res) {
      history.push(`/channels/${channelId}/messages`)
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="message-input-container">
      <form className="create-message-form" onSubmit={handleSubmit}>
        <div className="create-message-form-container">
        {/* <ul className="create-spot-errors">
          {
          Object.keys(errors).map(error => {
            return (<li>
              {errors[error]}
            </li>)
          }
          )
        }
        </ul> */}
        <div className="create-message-info-btns">
          <input
            className="message-content-btn"
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Message"
            required
          />


        </div>
        <button className="create-message-btn" type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
