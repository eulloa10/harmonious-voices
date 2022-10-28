import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditChannel from "./EditChannel/EditChannel";
import "./EditChannelModal.css";

const EditChannelModal = ({ serverId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="edit-channel-button"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-gear"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <EditChannel />
        </Modal>
      )}
    </>
  );
};

export default EditChannelModal;
