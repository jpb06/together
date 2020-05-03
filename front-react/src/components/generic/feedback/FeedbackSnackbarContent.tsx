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
import SnackbarFeedback from "../../../redux/types/snackbar.feedback.type";

export enum MessageType {
  Success,
  Warning,
  Error,
  Info,
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

const typeToClassName = (type: MessageType, classes: any) =>
  classes[MessageType[type].toLowerCase()];

interface FeedbackSnackbarContentProps {
  data: SnackbarFeedback;
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
          {data.message}
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
