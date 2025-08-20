import React from "react";

const MessageModal = ({ isOpen, message, type, onClose }) => {
  if (!isOpen) return null;

  const getStyle = () => {
    switch (type) {
      case "success":
        return { backgroundColor: "#d4edda", color: "#155724" };
      case "error":
        return { backgroundColor: "#f8d7da", color: "#721c24" };
      default:
        return { backgroundColor: "#fff3cd", color: "#856404" };
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px",
        borderRadius: "5px",
        ...getStyle(),
      }}
    >
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MessageModal;
