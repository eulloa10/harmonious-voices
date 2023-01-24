import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteChannelThunk } from "../../../store/channels";
import "./DeleteChannelButton.css";

const DeleteChannelButton = ({ channel, serverId, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const channels = Object.values(useSelector((state) => state.channels));

  const deleteChannel = () => {
    dispatch(deleteChannelThunk(channel, serverId)).then(() => {
      if (Object.values(channels).length > 1) {
        history.push(`/servers/${serverId}/${Object.values(channels)[0].id}`);
      } else {
        history.push(`/servers/${serverId}`);
      }
    });
    onClose();
  };

  return (
    <div className="delete-channel">
      <button className="delete-channel-button" onClick={deleteChannel}>
        Delete Channel
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default DeleteChannelButton;
