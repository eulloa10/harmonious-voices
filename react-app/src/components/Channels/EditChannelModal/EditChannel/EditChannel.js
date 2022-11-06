import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editChannel } from "../../../../store/channels";
import DeleteChannelButton from "../../DeleteChannelButton";
import "./EditChannel.css";

const EditChannel = ({ channel, serverId, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const submitButton = document.querySelector(".edit-channel-form-submit");
    submitButton.setAttribute("disabled", "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
    };
    dispatch(editChannel(channel.id, serverId, payload)).then((res) => {
      if (res.error) {
        let errors = [res.error];
        setErrors(errors);
        return;
      } else {
        setErrors([]);
        onClose();
      }
    });
  };

  const handleChange = (e) => {
    const submitButton = document.querySelector(".edit-channel-form-submit");
    submitButton.classList.add("typed");
    submitButton.removeAttribute("disabled");
    setName(e.target.value);
  };

  return (
    <div className="edit-channel-form-container">
      <div className="edit-channel-form-header">
        <header>Edit Channel</header>
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="edit-channel-form">
        <div className="edit-channel-input-fields">
          <div className="edit-channel-input-container">
            <label htmlFor="channel-name">CHANNEL NAME</label>
            <input
              name="channel-name"
              className="edit-channel-name-input-field"
              onChange={(e) => handleChange(e)}
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
        <div className="edit-channel-form-buttons">
          <DeleteChannelButton
            channel={channel}
            serverId={serverId}
            onClose={onClose}
          />
          <div className="edit-buttons">
            <button className="edit-channel-form-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="edit-channel-form-submit"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChannel;
