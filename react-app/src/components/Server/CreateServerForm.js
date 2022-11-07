import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addServer } from "../../store/servers";
import "./Servers.css";

const CreateSeverForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");

  useEffect(() => {
    const submitButton = document.querySelector(
      ".create-server-form-button-submit"
    );
    if (name) {
      submitButton.classList.add("typed");
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.remove("typed");
      submitButton.setAttribute("disabled", "");
    }
  }, [name]);

  const updateName = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", name);

    if (serverImg) payload.append("image", serverImg);

    let createdServer = await dispatch(addServer(payload));
    if (createdServer) {
      history.push(`/servers/${createdServer.id}`);
      hideForm();
    }
  };

  const onRemovePhoto = (e) => {
    e.preventDefault();
    setServerImg("");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setServerImg(file);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="create-server-form-container">
      <div className="create-server-form-header">Customize your server</div>
      <form className="create-server-form" onSubmit={handleSubmit}>
        <div className="create-server-photo-container photo">
          <label for="file" className="signup-form-input-label photo">
            {!serverImg && <i className="fa-solid fa-camera server-camera"></i>}
            {serverImg && (
              <img
                className="signup-form-photo"
                src={URL.createObjectURL(serverImg)}
                alt="server pic"
              ></img>
            )}
          </label>
          <input
            id="file"
            type="file"
            class="signup-form-photo-input"
            onChange={updateFile}
            accept="image/*"
          />
          {serverImg && <button onClick={onRemovePhoto}>Remove</button>}
        </div>
        <div className="create-server-input-container">
          <label>SERVER NAME</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={updateName}
            className="server-modal-name"
          />
        </div>
        <div className="create-server-form-buttons">
          <button
            className="create-server-form-button cancel"
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button className="create-server-form-button-submit" type="submit">
            Create New Server
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateSeverForm;
