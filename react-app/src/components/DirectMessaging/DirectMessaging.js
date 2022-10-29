import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./DirectMessaging.css";
import { getDirectChannels } from "../../store/directChannels";
import CreateDirectMessaging from "./CreateDirectMessaging/CreateDirectMessaging";

const DirectMessaging = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const directChannels = Object.values(
    useSelector((state) => state.directChannels)
  );

  useEffect(() => {
    dispatch(getDirectChannels());
  }, [dispatch]);

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  return (
    <div className="direct-channels-container">
      <header className="direct-channels-header">
        DIRECT MESSAGES
        <button
          className="create-direct-channel-button"
          onClick={handleShowCreateForm}
        >
          <i className="fa-solid fa-plus"></i>
          {showCreateForm && <CreateDirectMessaging />}
        </button>
      </header>
      <div className="direct-channels">
        {directChannels.map((channel, i) => {
          return (
            <div className="direct-channel-link-container" key={i}>
              <NavLink
                className="direct-channel-link"
                activeClassName="active"
                to={`${match.url}/${channel.id}`}
              >
                <div className="direct-channel-name">
                  <i className="fa-solid fa-hashtag"></i>
                  {channel.userTwo.username}
                </div>
              </NavLink>
              {/* {isOwnedByUser && (
                <EditChannelModal channel={channel} serverId={serverId} />
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DirectMessaging;
