import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton } from "@material-ui/core";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

import { clearSnackbarAction } from "../../../redux/actions";
import { snackbarSelector } from "../../../redux/selectors";
import { SnackbarKind } from "../../../types/redux";
import DownTransition from "../transitions/DownTransition";
import styles from "./AppSnackbar.styles";

const typeToIcon = (type: SnackbarKind) => {
  switch (type) {
    case SnackbarKind.Success:
      return CheckCircleIcon;
    case SnackbarKind.Warning:
      return WarningIcon;
    case SnackbarKind.Error:
      return ErrorIcon;
    default:
      return InfoIcon;
  }
};
const typeToClassName = (type: SnackbarKind, classes: any) =>
  classes[SnackbarKind[type].toLowerCase()];

const AppSnackbar: React.FC = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const snackbar = useSelector(snackbarSelector);

  const Icon = typeToIcon(snackbar.type);

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
      open={snackbar.isOpen}
      message={
        <div className={classes.content}>
          <Icon />
          <span className={classes.text}>{snackbar.text}</span>
        </div>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      ContentProps={{
        classes: {
          root: clsx(typeToClassName(snackbar.type, classes)),
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={5000}
      TransitionComponent={DownTransition}
      transitionDuration={500}
      onClose={handleClose}
    />
  );
};

export default AppSnackbar;
