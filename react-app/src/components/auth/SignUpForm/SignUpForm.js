import React, { useEffect, useState } from "react";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(errors);
    if (errors.email || errors.username || errors.password || errors.confirmPassword) {
      Object.keys(errors).forEach((error) => {
        const errorElement = document.getElementById(`signup-error-${error}`);
        errorElement.classList.add("show-error-message");
      });
    }
  }, [errors]);

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors({});
    let errObj = {};

    const errorElements = document.getElementsByClassName("signup-error");

    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );

    if (!validEmail.test(email))
      errObj = { ...errObj, email: "Please Prodive A Valid Email" };
    if (!(password === confirmPassword))
      errObj = { ...errObj, password: "Passwords Must Match" };
    if (!username)
      errObj = { ...errObj, username: "Please Provide A Username" };
    setErrors(errObj);

    if (!(errors.email && errors.password && errors.username && errors.confirmPassword)) {
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

      if (password === confirmPassword && password) {
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
      }
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

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

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
          <label htmlFor="file" className="signup-form-input-label photo">
            {!image && <i className="fa-solid fa-camera signup-camera"></i>}
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
            className="signup-form-photo-input"
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
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">
            CONFIRM PASSWORD
            <div id="signup-error-confirmPassword" className="signup-error">
              {errors?.confirmPassword}
            </div>
          </label>
          <input
            className="signup-form-input"
            type="password"
            name="confirm-password"
            onChange={updateConfirmPassword}
            value={confirmPassword}
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
