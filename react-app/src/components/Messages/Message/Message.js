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

  for (let key in users) {
    allUsersList.push(users[key]);
  }

  // console.log("ALLUSERSLIST ->", allUsersList)

  // const deleteMessage = (e) => {
  //   dispatch(deleteSelectedMessage(message.id))
  //   e.preventDefault();
  // };

  return (
    <>
      <li>
        <div className="message">
          <div>
            <div>
              {users[message_user_id]}
              {message.date_created}
            </div>

            {message.content}
          </div>
        </div>
      </li>
    </>
  );
};

export default Message;
