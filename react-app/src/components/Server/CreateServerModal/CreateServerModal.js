import { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateSeverForm from "../CreateServerForm";
import "../Servers.css"

const CreateServerModal = ({hideForm}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="server-modal">
        <Modal onClose={() => setShowModal(false)} showModal={showModal}>
          <CreateSeverForm
            onClose={() => setShowModal(false)} hideForm={hideForm}
          />
        </Modal>
    </div>
  );
};

export default CreateServerModal;
