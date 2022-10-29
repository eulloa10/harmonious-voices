import { useEffect, useState } from "react";
import { NavLink, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServerChannels } from "../../store/channels";
import "./Channels.css";
import { getServerById } from "../../store/servers";
import CreateChannelModal from "./CreateChannelModal";
import EditChannelModal from "./EditChannelModal";

const Channels = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { serverId } = useParams();
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers)[serverId];
  const channels = Object.values(useSelector((state) => state.channels));
  const [isOwnedByUser, setIsOwnedByUser] = useState(false);

  useEffect(() => {
    dispatch(getServerChannels(serverId));
    if (!server) {
      dispatch(getServerById(serverId));
    }
    if (server) {
      if (server.ownerId === user.id) {
        setIsOwnedByUser(true);
      }
    }
  }, [dispatch, server]);

  return (
    <div className="channels-container">
      <header className="channels-header">
        TEXT CHANNELS
        {isOwnedByUser && <CreateChannelModal serverId={serverId} />}
      </header>
      <div className="all-channels">
        {channels.map((channel, i) => {
          return (
            <div className="channel-link-container" key={i}>
              <NavLink
                className="channel-link"
                activeClassName="active"
                to={`${match.url}/${channel.id}`}
              >
                <div className="channel-name">
                  <i className="fa-solid fa-hashtag"></i>
                  {channel.name}
                </div>
              </NavLink>
              {isOwnedByUser && (
                <EditChannelModal channel={channel} serverId={serverId} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Channels;
