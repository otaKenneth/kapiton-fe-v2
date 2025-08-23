import { useQueryClient } from "@tanstack/react-query";

export type MessageDialogState = {
  open: boolean;
  type: "success" | "info" | "error";
  title?: string;
  message: string;
};

const defaultState: MessageDialogState = {
  open: false,
  type: "info",
  title: "",
  message: "",
};

export const useMessageDialog = () => {
  const queryClient = useQueryClient();
  const showMessage = (state: MessageDialogState) => {
    queryClient.setQueryData(["messageDialog"], state);
  };
  const closeMessage = () => {
    queryClient.setQueryData(["messageDialog"], defaultState);
  };
  return { showMessage, closeMessage };
};
