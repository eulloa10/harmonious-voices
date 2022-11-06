import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteChannelThunk } from "../../../store/channels";
import "./DeleteChannelButton.css";

const DeleteChannelButton = ({ channel, serverId, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteChannel = () => {
    dispatch(deleteChannelThunk(channel, serverId));
    onClose();
    history.push(`/servers/${serverId}`);
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
