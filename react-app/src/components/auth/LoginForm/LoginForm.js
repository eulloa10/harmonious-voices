import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";
import LeftArrow from "../../../assets/left_arrow.png";

const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    Object.keys(errors).forEach((error) => {
      const errorElement = document.getElementById(`login-error-${error}`);
      errorElement.classList.add("show-error-message");
    });
  }, [errors]);

  const onLogin = async (e) => {
    e.preventDefault();

    setErrors({});

    const errorElements = document.getElementsByClassName("login-error");
    for (let i = 0; i < errorElements.length; i++) {
      const errorElement = errorElements[i];
      errorElement.classList.remove("show-error-message");
    }

    const data = await dispatch(login(email, password));
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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const handleBackArrow = () => {
    history.goBack();
  }

  return (
    <div className="login-form-container">
      <div className="back-arrow-container">
        <button className="back-arrow-btn" onClick={handleBackArrow}>
          <img className="back-arrow-img" src={LeftArrow} alt="back arrow"/>
        </button>
      </div>
      <form className="login-form" onSubmit={onLogin}>
        <div className="login-form-header">
          <div className="login-form-header-header">Welcome back!</div>
          <div className="login-form-header-text">
            We're so excited to see you again!
          </div>
        </div>
        <div className="login-form-input-container">
          <label className="login-form-input-label" htmlFor="email">
            EMAIL
            <div id="login-error-email" className="login-error">
              {errors?.email}
            </div>
          </label>
          <input
            className="login-form-input"
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="login-form-input-container">
          <label className="login-form-input-label" htmlFor="password">
            PASSWORD
            <div id="login-error-password" className="login-error">
              {errors?.password}
            </div>
          </label>
          <input
            className="login-form-input"
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="login-form-submit" type="submit">
          Login
        </button>
        <div className="login-form-signup-link">
          Need an account?{" "}
          <NavLink className="login-form-signup-register-link" to={"/signup"}>
            Register
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
