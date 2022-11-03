import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    Object.keys(errors).forEach((error) => {
      console.log(error);
      const errorElement = document.getElementById(`signup-error-${error}`);
      errorElement.classList.add("show-error-message");
    });
  }, [errors]);

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors({});

    const errorElements = document.getElementsByClassName("signup-error");
    for (let i = 0; i < errorElements.length; i++) {
      const errorElement = errorElements[i];
      errorElement.classList.remove("show-error-message");
    }

    const userData = new FormData();
    userData.append("username", username);
    userData.append("email", email);
    userData.append("password", password);

    if (image) {
      userData.append("image", image);
    }

    const data = await dispatch(signUp(userData));
    if (data) {
      const errObj = {};
      data.forEach((error) => {
        const errorTitle = error.split(" : ")[0];
        const errorContent = error.split(" : ")[1];
        errObj[errorTitle] = errorContent;
      });
      setErrors(errObj);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const updateRepeatPassword = (e) => {
  //   setRepeatPassword(e.target.value);
  // };

  if (user) {
    return <Redirect to="/" />;
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <div className="signup-form-header">Create an account</div>
        <div className="signup-form-input-container photo">
          <div className="signup-form-photo-title">
            PROFILE PHOTO (optional)
          </div>
          <label for="file" className="signup-form-input-label photo">
            {!image && <i className="fa-solid fa-plus signup-plus"></i>}
            {image && (
              <img
                className="signup-form-photo"
                src={URL.createObjectURL(image)}
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
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">
            EMAIL
            <div id="signup-error-email" className="signup-error">
              {errors?.email}
            </div>
          </label>
          <input
            className="signup-form-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">
            USERNAME
            <div id="signup-error-username" className="signup-error">
              {errors?.username}
            </div>
          </label>
          <input
            className="signup-form-input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">
            PASSWORD
            <div id="signup-error-password" className="signup-error">
              {errors?.password}
            </div>
          </label>
          <input
            className="signup-form-input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        {/* <div className="signup-form-input-container">
          <label className="signup-form-input-label">CONFIRM PASSWORD</label>
          <input
            className="signup-form-input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div> */}
        <button className="signup-form-submit" type="submit">
          Sign Up
        </button>
        <NavLink to={"/login"} className="signup-form-login-link">
          Already have an account?
        </NavLink>
      </form>
    </div>
  );
};

export default SignUpForm;
