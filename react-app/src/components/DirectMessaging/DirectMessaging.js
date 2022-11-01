import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./DirectMessaging.css";
import {
  deleteDirectChannel,
  getDirectChannels,
} from "../../store/directChannels";
import CreateDirectMessaging from "./CreateDirectMessaging/CreateDirectMessaging";

const DirectMessaging = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const directChannels = Object.values(
    useSelector((state) => state.directChannels)
  );

  useEffect(() => {
    dispatch(getDirectChannels());
  }, [dispatch]);

  useEffect(() => {
    if (directChannels.length) {
      setLoaded(true);
    }
  }, [directChannels]);

  useEffect(() => {
    if (!showCreateForm) return;

    const closeCreateForm = (e) => {
      setShowCreateForm(false);
    };

    document.addEventListener("click", closeCreateForm);

    return () => {
      document.removeEventListener("click", closeCreateForm);
    };
  }, [showCreateForm]);

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const onDelete = (channelId) => {
    dispatch(deleteDirectChannel(channelId));
  };

  let directChannelLinks;

  if (loaded) {
    directChannelLinks = directChannels.map((channel, i) => {
      return (
        <div className="direct-channel-link-container" key={i}>
          <NavLink
            className="direct-channel-link"
            activeClassName="active"
            to={`/direct-messages/${channel.id}`}
          >
            <div className="direct-channel-name">
              <i className="fa-solid fa-hashtag"></i>
              <div>
                {channel.id
                  ? user.username === channel.userOne.username
                    ? channel.userTwo.username
                    : channel.userOne.username
                  : null}
              </div>
            </div>
          </NavLink>
          <button
            className="delete-direct-channel-button-container"
            onClick={() => {
              onDelete(channel.id);
            }}
          >
            <i className="fa-solid fa-xmark delete-direct-channel-button"></i>
          </button>
        </div>
      );
    });
  }

  return (
    <div className="direct-channels-container">
      <header className="direct-channels-header">
        DIRECT MESSAGES
        <button
          className="create-direct-channel-button"
          onClick={handleShowCreateForm}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        {showCreateForm && (
          <CreateDirectMessaging onClose={() => setShowCreateForm(false)} />
        )}
      </header>
      <div className="direct-channels">{directChannelLinks}</div>
    </div>
  );
};

export default DirectMessaging;
