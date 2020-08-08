import clsx from "clsx";
import React from "react";

import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

import { SnackbarData, SnackbarType } from "../../../types/redux";
import styles from "./FeedbackSnackbarContent.styles";

const typeToIcon = (type: SnackbarType) => {
  switch (type) {
    case SnackbarType.Success:
      return CheckCircleIcon;
    case SnackbarType.Warning:
      return WarningIcon;
    case SnackbarType.Error:
      return ErrorIcon;
    default:
      return InfoIcon;
  }
};

const typeToClassName = (type: SnackbarType, classes: any) =>
  classes[SnackbarType[type].toLowerCase()];

interface FeedbackSnackbarContentProps {
  data: SnackbarData;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FeedbackSnackbarContent: React.FC<FeedbackSnackbarContentProps> = ({
  data,
  onClose,
}) => {
  const classes = styles();

  const Icon = typeToIcon(data.type);

  return (
    <SnackbarContent
      className={clsx(typeToClassName(data.type, classes))}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {data.text}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
};

export default FeedbackSnackbarContent;
