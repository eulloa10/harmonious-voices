import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = new FormData();
      user.append("username", username);
      user.append("email", email);
      user.append("password", password);

      if (image) user.append("user_profile_img", image);

      const data = await dispatch(signUp(user));
      if (data) {
        setErrors(data);
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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <div className="signup-form-header">Create an account</div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="signup-form-input-container">
          <input
            type="file"
            name="user_profile_img"
            className="create-user-form-input"
            onChange={updateFile}
          />
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">EMAIL</label>
          <input
            className="signup-form-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">USERNAME</label>
          <input
            className="signup-form-input"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">PASSWORD</label>
          <input
            className="signup-form-input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">CONFIRM PASSWORD</label>
          <input
            className="signup-form-input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
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
