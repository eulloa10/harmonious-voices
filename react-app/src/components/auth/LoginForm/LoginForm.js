import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={onLogin}>
        <div className="login-form-header">
          <div className="login-form-header-header">Welcome back!</div>
          <div className="login-form-header-text">
            We're so excited to see you again!
          </div>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="login-form-input-container">
          <label className="login-form-input-label" htmlFor="email">
            EMAIL
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
