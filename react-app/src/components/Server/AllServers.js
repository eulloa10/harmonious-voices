import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { getServers, getBelongsServers } from "../../store/servers";
import ServerCard from "./ServerCard";
import CreateSeverForm from "./CreateServerForm";
import Fab from "./Fab";
import "./Servers.css";
import Explore from "../../svgFiles/explore.svg";

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
  );
};

export default AllServers;
