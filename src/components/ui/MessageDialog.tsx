import Dialog from "./Dialog";
import { useQuery } from "@tanstack/react-query";
import { useMessageDialog, type MessageDialogState } from "./useMessageDialog";
import { useEffect } from "react";

const defaultState: MessageDialogState = {
  open: false,
  type: "info",
  title: "",
  message: "",
};

const AUTO_CLOSE_DELAY = 3000;

const MessageDialog = () => {
  const { data } = useQuery({
    queryKey: ["messageDialog"],
    initialData: defaultState, // 👈 prevents "undefined"
    queryFn: () => defaultState,
  });
  const { closeMessage } = useMessageDialog();

  useEffect(() => {
    if (data.open) {
      const timer = setTimeout(() => {
        closeMessage();
      }, AUTO_CLOSE_DELAY);

      return () => clearTimeout(timer); // cleanup if dialog closes early
    }
  }, [data.open, closeMessage]);

  return (
    <Dialog
      open={data.open}
      type={data.type}
      title={data.title}
      message={data.message}
      onClose={closeMessage}
    />
  );
};

export default MessageDialog;
