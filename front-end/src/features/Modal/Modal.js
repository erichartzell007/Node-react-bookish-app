import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = ({
  isOpenModal,
  setisOpenModal,
  modalMessage,
  setmodalMessage,
}) => {
  const handleModalClose = () => {
    setmodalMessage("");
    setisOpenModal(false);
  };
  return (
    <>
      {isOpenModal ? <Backdrop setisOpenModal={setisOpenModal} /> : null}
      <div className="modal">
        <h1 className="modal__title">{modalMessage}</h1>
        <div className="modal__actions">
          <button className="modal__action">Accept</button>
          <button
            className="modal__action modal__action--negative"
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
