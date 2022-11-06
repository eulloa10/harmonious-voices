import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addDirectChannel } from "../../../store/directChannels";
import { loadFriendThunk } from "../../../store/friend";
import "./CreateDirectMessaging.css";

const CreateDirectMessaging = ({ onClose }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch(loadFriendThunk(name));
  }, [name, dispatch]);

  useEffect(() => {
    const submitButton = document.querySelector(
      ".create-direct-messaging-form-submit"
    );
    if (Object.values(friend).length) {
      submitButton.classList.add("typed");
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.remove("typed");
      submitButton.setAttribute("disabled", "");
    }
  }, [friend]);

  const handleSubmit = async () => {
    const payload = { user_id_two: Object.values(friend)[0].id };
    await dispatch(addDirectChannel(payload)).then((channel) => {
      history.push(`/direct-messages/${channel.id}`);
    });
    onClose();
  };

  return (
    <div
      className="create-direct-messaging-form-container"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="create-direct-messaging-form-header">
        Find a Friend
      </header>
      <div className="create-direct-messaging-form">
        <div className="create-direct-messaging-input-fields">
          <input
            className="create-direct-messaging-name-input-field"
            onChange={(e) => setName(e.target.value)}
            placeholder="Type the username of a friend"
            value={name}
          ></input>
        </div>
        {!Object.values(friend).length && name.length !== 0 && (
          <div className="no-friends-found-container">
            <div>No friends found.</div>
          </div>
        )}
        {Object.values(friend).length > 0 && (
          <div className="create-direct-messaging-friends">
            <div className="friend-info-logo">
              <i className="fa-brands fa-discord"></i>
            </div>
            <div className="friend-info">
              <div>{Object.values(friend)[0].username}</div>
              <div>#{Object.values(friend)[0].id}</div>
            </div>
          </div>
        )}
        <button
          className="create-direct-messaging-form-submit"
          onClick={handleSubmit}
          disable={friend ? true : false}
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default CreateDirectMessaging;
