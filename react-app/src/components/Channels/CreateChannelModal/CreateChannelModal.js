import { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateChannel from "./CreateChannel/CreateChannel";
import "./CreateChannelModal.css";

const CreateChannelModal = ({ serverId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="create-channel-button"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus create-channel-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateChannel
            serverId={serverId}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateChannelModal;
