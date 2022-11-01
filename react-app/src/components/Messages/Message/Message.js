import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelectedMessage } from "../../../store/messages";
import { fetchUsers } from "../../../store/user";
import "./Message.css";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const users = useSelector((state) => state.users);
  const message_user_id = message.user_id;
  const allUsersList = [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // for (let key in users) {
  //   allUsersList.push(users[key]);
  // }

  // console.log(users[message_user_id])
  let currUser = users[message_user_id];

  return (
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
              <div className="message-content">{message.content}</div>
            </div>
            <div className="message-options">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default Message;
