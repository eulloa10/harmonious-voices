import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditSeverForm from "../EditServerForm";
import "../Servers.css"

const EditServerModal = ({hideForm, contextedServerId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <EditSeverForm
            onClose={() => setShowModal(false)} hideForm={hideForm} contextedServerId={contextedServerId}
          />
        </Modal>
    </div>
  );
};

export default EditServerModal;
