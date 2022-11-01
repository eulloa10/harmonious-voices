import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDirectChannel } from "../../../store/directChannels";
import { loadFriendThunk } from "../../../store/friend";
import "./CreateDirectMessaging.css";

const CreateDirectMessaging = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch(loadFriendThunk(name));
    if (Object.values(friend).length) {
      const submitButton = document.querySelector(
        ".create-direct-messaging-form-submit"
      );
    }
  }, [name]);

  const handleSubmit = () => {
    const payload = { user_id_two: Object.values(friend)[0].id };
    dispatch(addDirectChannel(payload));
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
