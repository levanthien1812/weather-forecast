import React from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: string | JSX.Element | JSX.Element[];
  allowCloseOnBackdrop?: boolean;
}> = ({ open, onClose, title, children, allowCloseOnBackdrop = true }) => {
  const handleClickBackdrop = () => {
    if (allowCloseOnBackdrop) {
      onClose();
    }
  };

  return (
    <>
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClickBackdrop}
          >
            <div className="absolute inset-0"></div>
            <div
              className="bg-white p-8 rounded-lg shadow-lg z-50"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Modal content goes here */}
              <h2 className="text-lg font-semibold mb-4">{title}</h2>
              <div>{children}</div>
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
