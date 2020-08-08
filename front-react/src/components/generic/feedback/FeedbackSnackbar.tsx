import React from "react";
import { useDispatch } from "react-redux";

import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";

import { useRootSelector } from "../../../hooks";
import { clearSnackbarAction } from "../../../redux/actions";
import { snackbarSelector } from "../../../redux/selectors";
import FeedbackSnackbarContent from "./FeedbackSnackbarContent";

const FeedbackSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  const feedback = useRootSelector(snackbarSelector);

  const closeSnackbar = () => dispatch(clearSnackbarAction());

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
      open={feedback.text !== ""}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <FeedbackSnackbarContent onClose={handleClose} data={feedback} />
    </Snackbar>
  );
};

export default FeedbackSnackbar;
