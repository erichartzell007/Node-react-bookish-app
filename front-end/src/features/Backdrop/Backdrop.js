import React from "react";
import "./Backdrop.css";

const Backdrop = ({ setisOpenModal }) => {
  const handleBackdropClick = () => {
    setisOpenModal(false);
  };
  return <div className="backdrop" onClick={handleBackdropClick}></div>;
};

export default Backdrop;
