import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import { login } from "../../../store/session";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const demoSignIn = async () => {
    const signedIn = await dispatch(login("demo@aa.io", "password")).catch(
      async (res) => {
        const data = await res.json();
        return data.errors;
      }
    );
    if (!signedIn) {
      history.push("/direct-messages");
    }
  };

  return (
    <div className="splash-page-links">
      <button onClick={demoSignIn} className="splash-page-nav-link login">
        Demo Login
      </button>
      <NavLink
        className="splash-page-nav-link login"
        to="/login"
        exact={true}
        activeClassName="active"
      >
        Login
      </NavLink>
      <NavLink
        className="splash-page-nav-link signup"
        to="/signup"
        exact={true}
        activeClassName="active"
      >
        Signup
      </NavLink>
    </div>
  );
};

export default NavBar;
