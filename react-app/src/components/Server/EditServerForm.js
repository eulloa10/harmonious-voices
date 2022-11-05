import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editServer } from "../../store/servers";
import "./Servers.css";

const EditSeverForm = ({ hideForm, contextedServerId}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");

  const updateName = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

  const payload = new FormData();

  payload.append("name", name);
  if (serverImg) payload.append("image", serverImg);


    let createdServer = await dispatch(editServer(payload, contextedServerId))
    if (createdServer) {
      history.push(`/servers/${contextedServerId}`);
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
    <section className="new-form-holder centered middled">
      <form className="create-server-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="file"
          onChange={updateFile}
        />
        <button className="form-button" type="submit">
          Edit Server
        </button>
        <button
          className="form-button"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default EditSeverForm;
