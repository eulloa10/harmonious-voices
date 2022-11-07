import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editServer } from "../../store/servers";
import "./Servers.css";

const EditSeverForm = ({ hideForm, server }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [serverImg, setServerImg] = useState("");
  const [image, setImage] = useState("");
  const [changed, setChanged] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // console.log(errors);
    if (errors.name) {
      Object.keys(errors).forEach((error) => {
        const errorElement = document.getElementById(`signup-error-${error}`);
        errorElement.classList.add("show-error-message");
      });
    }
  }, [errors]);

  useEffect(() => {
    let image;
    if (changed && serverImg) {
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
    setImage(image);
    setChanged(true);
  }, [serverImg, changed]);

  const updateName = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errObj = {};
    const errorElements = document.getElementsByClassName("signup-error");


    const payload = new FormData();

    if(!name){
      errObj = {name: "Please Provide A Server Name"}
      setErrors(errObj);
    }
    else{
      setErrors({});
      if (!(errors.name)) {
        for (let i = 0; i < errorElements.length; i++) {
          const errorElement = errorElements[i];
          errorElement.classList.remove("show-error-message");
        }
      }
      payload.append("name", name);
      if (serverImg) payload.append("image", serverImg);

      let createdServer = await dispatch(editServer(payload, server.id));
      if (createdServer) {
        history.push(`/servers/${server.id}`);
        hideForm();
      }
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setServerImg(file);
  };

  const onRemovePhoto = (e) => {
    e.preventDefault();
    setServerImg("");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="create-server-form-container">
      <div className="create-server-form-header">Edit server</div>
      <form className="create-server-form" onSubmit={handleSubmit}>
        <div className="create-server-photo-container photo">
          <label htmlFor="file" className="signup-form-input-label photo">
            {!serverImg && <i className="fa-solid fa-camera server-camera"></i>}
            {serverImg && image}
          </label>
          <input
            id="file"
            type="file"
            className="signup-form-photo-input"
            onChange={updateFile}
            accept="image/*"
          />
          {serverImg && <button onClick={onRemovePhoto}>Remove</button>}
        </div>
        <div className="create-server-input-container">
          <label>SERVER NAME</label>
          <div id="signup-error-name" className="signup-error">
              {errors?.name}
            </div>
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
