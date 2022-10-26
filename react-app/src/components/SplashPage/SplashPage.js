import { NavLink } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div className="splash-page">
      <div className="splash-page-header">
        <NavLink className="splash-page-header-link" to="/" exact={true}>
          <i class="fa-brands fa-discord"></i>
          <span className="splash-page-header-name">Harmonious Voices</span>
        </NavLink>
      </div>
      <div className="splash-page-content">
        <div className="hero-text">
          <div className="hero-text-header">IMAGINE A PLACE...</div>
          <div className="hero-text-content">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </div>
        </div>
        <div className="splash-page-nav-links">
          <NavLink
            className="splash-page-nav-link  login"
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
      </div>
    </div>
  );
};

export default SplashPage;
