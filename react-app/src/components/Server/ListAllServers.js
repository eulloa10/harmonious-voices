import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { getServers, getJoinedServers } from "../../store/servers";
import ServerCard from "./ServerCard";
import CreateSeverForm from "./CreateServerForm";
import Fab from "./Fab";
import "./Servers.css";
import Explore from "../../svgFiles/explore.svg";
import AllServers from "./AllServers";
import ServerBubble from "./ServerBubble";

// TODO list All aint working right
const ListAllServers = () => {
  const dispatch = useDispatch();
  let myServers = useSelector((state) => {
    console.log(state);
    const serversArr = Object.values(state.servers.memberOf);
    return serversArr;
  });

  const rightClick = (e) => {
    console.log('Did it work');
  }

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getJoinedServers());
  }, [dispatch]);

  return (
    <main>
      <nav>
        <div>
          <NavLink
            to="/directMessages"
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
      </nav>
      {showForm ? (
        <CreateSeverForm hideForm={() => setShowForm(false)} />
      ) : (
        <Route path="/servers">
          <div className="server-detail">
            <AllServers />
          </div>
        </Route>
      )}
    </main>
  );
};

export default ListAllServers;
