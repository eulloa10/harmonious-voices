import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFriendThunk } from "../../../store/friend";
import "./CreateDirectMessaging.css";

const CreateDirectMessaging = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const friend = useSelector((state) => state.friend);

  useEffect(() => {
    dispatch(loadFriendThunk(name));
  }, [name]);

  const handleSubmit = async () => {
    // const payload = {
    //   user_id_two:
    // };
    // dispatch(addChannel(serverId, payload)).then((res) => {
    //   if (res.error) {
    //     let errors = [res.error];
    //     setErrors(errors);
    //     return;
    //   } else {
    //     setErrors([]);
    //     onClose();
    //   }
    // });
  };

  return (
    <div className="create-direct-messaging-form-container">
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
        {!Object.values(friend).length && (
          <div className="no-friends-found-container">
            <div>No friends found.</div>
          </div>
        )}

        <button
          className="create-direct-messaging-form-submit"
          onClick={handleSubmit}
        >
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default CreateDirectMessaging;
