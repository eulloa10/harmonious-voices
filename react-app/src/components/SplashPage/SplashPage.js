import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm/SignUpForm";
import NavBar from "./NavBar/NavBar";
import "./SplashPage.css";

const SplashPage = () => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (user) {
      history.push("/me");
    }
  }, [user, history]);

  return (
    <div className="splash-page">
      <div className="splash-page-header-sidebar-container">
        <NavLink className="splash-page-header-link" to="/" exact={true}>
          <i className="fa-brands fa-discord"></i>
          <span className="splash-page-header-name">Harmonious Voices</span>
        </NavLink>
        <div className="hero-text">
          <div className="hero-text-header">IMAGINE A PLACE...</div>
          <div className="hero-text-content">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/" exact={true}>
          <NavBar />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
      </Switch>
    </div>
  );
};

export default SplashPage;