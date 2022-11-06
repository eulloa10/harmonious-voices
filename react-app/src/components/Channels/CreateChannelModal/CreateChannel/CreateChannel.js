import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addChannel } from "../../../../store/channels";
import "./CreateChannel.css";

const CreateChannel = ({ serverId, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const submitButton = document.querySelector(".create-channel-form-submit");
    if (name) {
      submitButton.classList.add("typed");
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.remove("typed");
      submitButton.setAttribute("disabled", "");
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      server_id: serverId,
      type: "server",
    };
    await dispatch(addChannel(serverId, payload)).then((res) => {
      if (res.error) {
        let errors = [res.error];
        setErrors(errors);
        return;
      } else {
        setErrors([]);
        onClose();
        history.push(`/servers/${serverId}/${res.id}`);
      }
    });
  };

  return (
    <div className="create-channel-form-container">
      <div className="create-channel-form-header">
        <header>Create Channel</header>
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="create-channel-form">
        <div className="create-channel-input-fields">
          <div className="create-channel-input-container">
            <label htmlFor="channel-name">CHANNEL NAME</label>
            <input
              name="channel-name"
              className="create-channel-name-input-field"
              onChange={(e) => setName(e.target.value)}
              placeholder="new-channel"
              value={name}
            ></input>
          </div>
        </div>
        <ul className="errors">
          {errors.map((error, i) => {
            return (
              <div key={i} className="error">
                <li>{error}</li>
              </div>
            );
          })}
        </ul>
        <div className="create-channel-form-buttons">
          <button className="create-channel-form-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="create-channel-form-submit" onClick={handleSubmit}>
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
