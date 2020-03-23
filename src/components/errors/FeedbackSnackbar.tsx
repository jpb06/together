import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import FeedbackSnackbarContent, {
  MessageType
} from "./FeedbackSnackbarContent";
import React from "react";

interface FeedbackSnackbarProps {
  isOpen: boolean;
  type: MessageType;
  message: string;
  key: string;
  onClose: any;
  onExited: (node: HTMLElement) => void;
}

const FeedbackSnackbar: React.FC<FeedbackSnackbarProps> = ({
  isOpen,
  type,
  message,
  key,
  onClose,
  onExited
}) => {
  // Manually closing the errors
  const handleClose = (
    event: React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      key={key}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      onExited={onExited}
    >
      <FeedbackSnackbarContent
        onClose={handleClose}
        type={type}
        message={message}
      />
    </Snackbar>
  );
};

export default FeedbackSnackbar;
