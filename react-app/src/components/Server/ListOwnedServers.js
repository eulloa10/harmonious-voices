import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useHistory } from "react-router-dom";
import {
  getServers,
  getJoinedServers,
  getOwnedServers,
} from "../../store/servers";
import ServerCard from "./ServerCard";
import ServerBubble from "./ServerBubble";
import CreateSeverForm from "./CreateServerForm";
import Fab from "./Fab";
import "./Servers.css";
import Explore from "../../svgFiles/explore.svg";
import Logout from "../../svgFiles/logout.svg";
import { logout } from "../../store/session";
import Channels from "../Channels/Channels";
import ContextMenu from "./ContextMenu";
import EditSeverForm from "./EditServerForm";

const ListOwnedServers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showContext, setShowContext] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [contextedServerId, setContextedServerId] = useState("");

  let myServers = useSelector((state) => {
    const serversArr = Object.values(state.servers.memberOf);
    return serversArr;
  });
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    dispatch(getServers());
    dispatch(getJoinedServers());
    dispatch(getOwnedServers());
  }, [dispatch]);

  useEffect(() => {
    const handleClick = () => setShowContext(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

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
              <div
                className={`servers-container ${server.id}`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextedServerId(e.target.className.split(" ")[1]);
                  setShowContext(true);
                  setPoints({ x: e.pageX, y: e.pageY });
                }}
              >
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
      {showForm && <CreateSeverForm hideForm={() => setShowForm(false)} />}
      {editForm && (
        <EditSeverForm
          hideForm={() => setEditForm(false)}
          contextedServerId={contextedServerId}
        ></EditSeverForm>
      )}
      {showContext && (
        <ContextMenu
          className="context-menu"
          top={points.y}
          left={points.x}
          contextedServerId={contextedServerId}
          setEditForm={setEditForm}
        ></ContextMenu>
      )}
    </main>
  );
};

export default ListOwnedServers;
