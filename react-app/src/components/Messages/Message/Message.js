import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSelectedMessage, updateMessage } from "../../../store/messages";
import { fetchUsers } from "../../../store/user";
import "./Message.css";
import deleteMsgOption from "../../../svgFiles/deletemsg.svg";
import editMsgOption from "../../../svgFiles/editmsg.svg";
import defaultUserProfile from "../../../svgFiles/userprofile.svg";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.session)["user"];
  const message_user_id = message.user_id;
  const [messageContent, setMessageContent] = useState(`${message.content}`);
  const [editMode, setEditMode] = useState(true);
  const [cancelContent, setCancelContent] = useState(`${message.content}`);
  let editableMessage = false;

  if (message.user_id === currentUser.id) {
    editableMessage = true;
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  let currUser = users[message_user_id];

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
    setCancelContent(messageContent);
    message.content = messageContent;
    dispatch(updateMessage(message));
  };

  const handleClick = (e) => {
    setEditMode(!editMode);
    e.preventDefault();
  };

  const handleCancelClick = (e) => {
    setEditMode(!editMode);
    setMessageContent(cancelContent);
    e.preventDefault();
  };

  const handleDeleteClick = (e) => {
    setEditMode(!editMode);
    dispatch(deleteSelectedMessage(message.id));
    e.preventDefault();
  };

  const regularView = (
    <>
      {currUser && message_user_id && (
        <li className="single-user-message">
          <div className="message">
            <div className="prof-img-side">
              {currUser.user_profile_img ? (
                <img
                  className="prof-img"
                  src={currUser.user_profile_img}
                  alt="profile"
                />
              ) : (
                <img
                  className="def-prof-img"
                  src={defaultUserProfile}
                  alt="default"
                />
              )}
            </div>
            <div className="message-middle">
              <h3 className="message-header">
                {currUser.username}
                <span className="message-date">{message.date_created}</span>
              </h3>
              <div className="message-content">{messageContent}</div>
            </div>
            {editableMessage && (
              <div className="message-options">
                <button className="edit-msg-btn" onClick={handleClick}>
                  <img src={editMsgOption} alt="options" />
                </button>
                <button className="delete-msg-btn" onClick={handleDeleteClick}>
                  <img src={deleteMsgOption} alt="options" />
                </button>
              </div>
            )}
          </div>
        </li>
      )}
    </>
  );

  const editView = (
    <>
      {currUser && message_user_id && (
        <li className="single-user-message">
          <div className="message">
            <div className="prof-img-side">
              {currUser.user_profile_img ? (
                <img
                  className="prof-img"
                  src={currUser.user_profile_img}
                  alt="profile"
                />
              ) : (
                <img
                  className="def-prof-img"
                  src={defaultUserProfile}
                  alt="default"
                />
              )}
            </div>
            <div className="message-middle">
              <h3 className="message-header">
                {currUser.username}
                <span className="message-date">{message.date_created}</span>
              </h3>
              <div className="edit-message-content">
                <form className="edit-message-form" onSubmit={handleSubmit}>
                  <input
                    className="message-edit-input"
                    type="text"
                    name="message"
                    defaultValue={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    required
                  />
                </form>
                <div className="cancel-edit">
                  <button
                    onClick={handleCancelClick}
                    className="cancel-edit-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );

  return editMode ? regularView : editView;
};

export default Message;
