import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateDirectMessaging.css";

const CreateDirectMessaging = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

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
        <button className="create-direct-messaging-form-submit">
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default CreateDirectMessaging;
