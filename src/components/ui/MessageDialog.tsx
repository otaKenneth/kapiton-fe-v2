import React from "react";
import Dialog from "./Dialog";

export type MessageDialogType = "success" | "info" | "error";

interface MessageDialogProps {
  open: boolean;
  type: MessageDialogType;
  title?: string;
  message: string;
  onClose: () => void;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ open, type, title, message, onClose }) => {
  return (
    <Dialog
      open={open}
      type={type}
      title={title}
      message={message}
      onClose={onClose}
    />
  );
};

export default MessageDialog;
