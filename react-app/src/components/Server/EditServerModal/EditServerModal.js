import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditSeverForm from "../EditServerForm";
import "../Servers.css";

const EditServerModal = ({ hideForm, server }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
      <Modal onClose={() => setShowModal(false)} showModal={showModal}>
        <EditSeverForm
          onClose={() => setShowModal(false)}
          hideForm={hideForm}
          server={server}
        />
      </Modal>
    </div>
  );
};

export default EditServerModal;
