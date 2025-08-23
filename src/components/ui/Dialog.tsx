import React from "react";

type DialogProps = {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  type?: "info" | "success" | "error";
  closeBtn?: boolean
};

const dialogStyles = {
  base: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50",
  box: "bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw]",
  info: "border-l-4 border-blue-500",
  success: "border-l-4 border-green-500",
  error: "border-l-4 border-red-500",
};

const Dialog: React.FC<DialogProps> = ({ open, title, message, onClose, type = "info", closeBtn = false }) => {
  if (!open) return null;
  return (
    <div className={dialogStyles.base} onClick={onClose}>
      <div
        className={`${dialogStyles.box} ${dialogStyles[type]}`}
        onClick={e => e.stopPropagation()}
      >
        {title && <div className="font-bold mb-2">{title}</div>}
        <div className="mb-4">{message}</div>
        {closeBtn && 
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        }
      </div>
    </div>
  );
};

export default Dialog;