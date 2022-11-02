import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelectedMessage, updateMessage } from "../../../store/messages";
import { fetchUsers } from "../../../store/user";
import "./Message.css";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {channelId, serverId} = useParams();
  const users = useSelector((state) => state.users);
  const message_user_id = message.user_id;
  const [messageContent, setMessageContent] = useState(`${message.content}`);
  const [editMode, setEditMode] = useState(true)
  const allUsersList = [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let currUser = users[message_user_id];

  const handleEdit = (e) => {
    setMessageContent(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditMode(!editMode);
    let res = await dispatch(updateMessage(message)).catch(async (res) => {
      const data = await res.json();
    });

    if (res) {
      // setMessageContent('')
      history.push(`/servers/${serverId}/${channelId}`)
    }

  }

  const handleClick = (e) => {
    setEditMode(!editMode);
    e.preventDefault();
  }

  const regularView = (
    <>
      {currUser && message_user_id && (
        <li className="single-user-message">
          <div className="message">
            <div className="prof-img-side">
              <img
                className="prof-img"
                src={currUser.user_profile_img}
                alt="user profile"
              />
            </div>
            <div className="message-middle">
              <h3 className="message-header">
                {currUser.username}
                <span className="message-date">{message.date_created}</span>
              </h3>
              <div className="message-content">
                {messageContent}
              </div>
            </div>
            <div className="message-options">
              <button onClick={handleClick}>Edit</button>
            </div>
          </div>
        </li>
      )}
    </>
  );


  const editView = (<>
    {currUser && message_user_id && (
      <li className="single-user-message">
        <div className="message">
          <div className="prof-img-side">
            <img
              className="prof-img"
              src={currUser.user_profile_img}
              alt="user profile"
            />
          </div>
          <div className="message-middle">
            <h3 className="message-header">
              {currUser.username}
              <span className="message-date">{message.date_created}</span>
            </h3>
            <div className="message-content">
              <form className="edit-message-form" onSubmit={handleSubmit}>
                <input
                  className="message-edit-input"
                  type="text"
                  name="message"
                  defaultValue={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  required
                />
                {/* <button type="submit">Submit</button> */}
              </form>
            </div>
          </div>
          <div className="message-options">
            <button onClick={handleClick}>Cancel</button>
          </div>
        </div>
      </li>
    )}
  </>
  )

  return ( editMode ? regularView: editView)


//   return (
//     <>
//       {currUser && message_user_id && (
//         <li className="single-user-message">
//           <div className="message">
//             <div className="prof-img-side">
//               <img
//                 className="prof-img"
//                 src={currUser.user_profile_img}
//                 alt="user profile"
//               />
//             </div>
//             <div className="message-middle">
//               <h3 className="message-header">
//                 {currUser.username}
//                 <span className="message-date">{message.date_created}</span>
//               </h3>
//               <div className="message-content">
//                 <input
//                   type="text"
//                   name="message"
//                   value={messageContent}
//                   onChange={handleEdit}
//                 />
//               </div>
//             </div>
//             <div className="message-options">
//               <button onClick={handleClick}>Cancel</button>
//             </div>
//           </div>
//         </li>
//       )}
//     </>
//   );
};

export default Message;
