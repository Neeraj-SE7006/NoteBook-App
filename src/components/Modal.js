import React from 'react';
import './Modal.css'; // Import CSS file for styling

const Modal = ({ handleClose, children }) => {
  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
