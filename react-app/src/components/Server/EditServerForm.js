import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editServer } from "../../store/servers";
import "./Servers.css";

const EditSeverForm = ({ hideForm, server }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(server.name);
  const [serverImg, setServerImg] = useState(server.server_img);
  let changed = false;
  let image;

  useEffect(() => {
    if (changed) {
      image = (
        <img
          className="signup-form-photo"
          src={URL.createObjectURL(serverImg)}
          alt="server pic"
        ></img>
      );
    } else {
      image = (
        <img
          className="signup-form-photo"
          src={serverImg}
          alt="server pic"
        ></img>
      );
    }
    changed = true;
  }, [serverImg, changed]);

  const updateName = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("name", name);
    if (serverImg) payload.append("image", serverImg);

    let createdServer = await dispatch(editServer(payload, server.id));
    if (createdServer) {
      history.push(`/servers/${server.id}`);
      hideForm();
    }
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
      <div className="create-server-form-header">Edit server</div>
      <form className="create-server-form" onSubmit={handleSubmit}>
        <div className="create-server-photo-container">
          <label for="file" className="signup-form-input-label photo">
            {!serverImg && <i className="fa-solid fa-camera server-camera"></i>}
            {image}
          </label>
          <input
            id="file"
            type="file"
            class="signup-form-photo-input"
            onChange={updateFile}
            accept="image/*"
          />
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
          <button className="create-server-form-button-edit" type="submit">
            Edit Server
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditSeverForm;
