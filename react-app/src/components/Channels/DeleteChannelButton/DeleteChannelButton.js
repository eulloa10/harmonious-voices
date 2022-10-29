import { useDispatch } from "react-redux";
import { deleteChannelThunk } from "../../../store/channels";
import "./DeleteChannelButton.css";

const DeleteChannelButton = ({ channel, serverId, onClose }) => {
  const dispatch = useDispatch();
  const deleteChannel = () => {
    dispatch(deleteChannelThunk(channel, serverId));
    onClose();
  };

  return (
    <div className="delete-channel">
      <button className="delete-channel-button" onClick={deleteChannel}>
        Delete Channel
      </button>
      <i className="fa-solid fa-trash-can"></i>
    </div>
  );
};

export default DeleteChannelButton;
