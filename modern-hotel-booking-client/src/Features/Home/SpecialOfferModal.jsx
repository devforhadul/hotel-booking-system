import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SpecialOfferModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Special Offers"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-2 text-red-600">🔥 Special Offer 🔥</h2>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyQ9di6t1IMtb4StdrvhRo-mwtOwdy8qW_Ig&s"
          alt="Special Offer"
          className="w-full h-auto rounded mb-4"
        />
        <p className="mb-4">Get 30% off on all room bookings this Eid!</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SpecialOfferModal;
