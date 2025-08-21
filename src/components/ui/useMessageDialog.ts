import { useQueryClient } from "@tanstack/react-query";

export type MessageDialogState = {
  open: boolean;
  type: "success" | "info" | "error";
  title?: string;
  message: string;
};

export const useMessageDialog = () => {
  const queryClient = useQueryClient();
  const showMessage = (state: MessageDialogState) => {
    queryClient.setQueryData("messageDialog", state);
  };
  const closeMessage = () => {
    queryClient.setQueryData("messageDialog", { open: false, type: "info", message: "" });
  };
  return { showMessage, closeMessage };
};
