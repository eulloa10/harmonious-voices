import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getServers } from "../../store/servers";
import ServerCard from "./ServerCard";
import "./Servers.css";

const AllServers = () => {
  const dispatch = useDispatch();
  let allServers = useSelector((state) => {
    const serversArr = Object.values(state.servers.allServers);
    return serversArr;
  });

  useEffect(() => {
    dispatch(getServers());
  }, [dispatch]);

  return (
    <div className="all-servers-container">
      <div className="server-card-container">
        {allServers.map((server) => {
          return (
            // <div className="server-card-container">
            <NavLink key={server.id} to={`/servers/${server.id}`}>
              <div className="servers-container">
                <ServerCard server={server}></ServerCard>
              </div>
            </NavLink>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllServers;
