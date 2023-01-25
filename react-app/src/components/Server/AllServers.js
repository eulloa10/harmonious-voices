import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getServers } from '../../store/servers';
import { addUserToServer } from '../../store/user';
import ServerCard from './ServerCard';
import './Servers.css';

const AllServers = ({ rerenderServers, setRerenderServers }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  let allServers = useSelector((state) => {
    const serversArr = Object.values(state.servers.allServers);
    return serversArr;
  });

  useEffect(() => {
    dispatch(getServers());
  }, [dispatch]);

  const handleAddUserToServer = (server) => {
    dispatch(addUserToServer(user.id, server.id));
    setRerenderServers(!rerenderServers);
  };

  return (
    <div className="all-servers-container">
      <div className="server-card-container">
        {allServers.map((server) => {
          return (
            // <div className="server-card-container">
            <NavLink key={server.id} to={`/servers/${server.id}`}>
              <div
                className="servers-container"
                onClick={() => {
                  handleAddUserToServer(server);
                }}
              >
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
