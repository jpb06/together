import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import React from "react";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/redux.hooks";
import { clearFeedbackAction } from "../../../redux/actions/feedback.actions";
import FeedbackSnackbarContent from "./FeedbackSnackbarContent";

const FeedbackSnackbar: React.FC = () => {
  const dispatch = useReduxDispatch();
  const feedback = useReduxSelector((state) => state.snackbarFeedback);

  const closeSnackbar = () => dispatch(clearFeedbackAction());

  const handleClose = (
    event: React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={feedback.message !== ""}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <FeedbackSnackbarContent onClose={handleClose} data={feedback} />
    </Snackbar>
  );
};

export default FeedbackSnackbar;
