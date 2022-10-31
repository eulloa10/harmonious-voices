import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useHistory } from "react-router-dom";
import { getServers, getBelongsServers } from "../../store/servers";
import ServerCard from "./ServerCard";
import ServerBubble from "./ServerBubble";
import CreateSeverForm from "./CreateServerForm";
import Fab from "./Fab";
import "./Servers.css";
import Explore from "../../svgFiles/explore.svg";
import Logout from "../../svgFiles/logout.svg";
import { logout } from "../../store/session";
import Channels from "../Channels/Channels";

const ListOwnedServers = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let myServers = useSelector((state) => {
    console.log(state);
    const serversArr = Object.values(state.servers.memberOf);
    return serversArr;
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // dispatch(getServers());
    dispatch(getBelongsServers());
  }, [dispatch]);

  useEffect(() => {}, []);

  const handleLogOut = () => {
    history.push("/");
    dispatch(logout());
  };

  return (
    <main className="owned-servers-container">
      <nav className="servers-nav-bar">
        <div>
          <NavLink
            to="/direct-messages"
            className="server-icon-div dm server-icon"
          >
            DM
          </NavLink>
        </div>
        {myServers.map((server) => {
          return (
            <NavLink key={server.id} to={`/servers/${server.id}`}>
              <div className="servers-container">
                <ServerBubble server={server}></ServerBubble>
              </div>
            </NavLink>
          );
        })}
        <div>
          <NavLink to={`/servers`} className="server-icon-div">
            <img src={Explore} />
          </NavLink>
        </div>
        <Fab hidden={showForm} onClick={() => setShowForm(true)} />
        <div className="server-icon-div" onClick={handleLogOut}>
          <img src={Logout} />
        </div>
      </nav>
      {showForm ? (
        <CreateSeverForm hideForm={() => setShowForm(false)} />
      ) : (
        <Route path="/servers/:severId">
          <div className="server-detail">{/* <Channels/> */}</div>
        </Route>
      )}
    </main>
  );
};

export default ListOwnedServers;
