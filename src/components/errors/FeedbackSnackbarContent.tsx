import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import styles from "./FeedbackSnackbarContent.styles";

export enum MessageType {
  Success,
  Warning,
  Error,
  Info
}

const typeToIcon = (type: MessageType) => {
  switch (type) {
    case MessageType.Success:
      return CheckCircleIcon;
    case MessageType.Warning:
      return WarningIcon;
    case MessageType.Error:
      return ErrorIcon;
    default:
      return InfoIcon;
  }
};

const typeToClassName = (type: MessageType, classes: any) => {
  return classes[type.toString().toLowerCase()];

  //   switch (type) {
  //     case MessageType.Success:
  //       return classes["success"];
  //     case MessageType.Warning:
  //       return classes["warning"];
  //     case MessageType.Error:
  //       return classes["error"];
  //     default:
  //       return classes["info"];
  //   }
};

interface FeedbackSnackbarContentProps {
  type: MessageType;
  message: string;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FeedbackSnackbarContent: React.FC<FeedbackSnackbarContentProps> = ({
  type,
  message,
  onClose
}) => {
  const classes = styles();
  const Icon = typeToIcon(type);

  return (
    <SnackbarContent
      className={clsx(typeToClassName(type, classes))}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
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
        </IconButton>
      ]}
    />
  );
};

export default FeedbackSnackbarContent;
