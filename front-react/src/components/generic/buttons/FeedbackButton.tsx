import React from "react";

import { SvgIconTypeMap } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

import styles from "./FeedbackButton.styles";

interface FeedbackButtonProps {
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  isPending: boolean;
  isErrored: boolean;
  actionText: string;
  name: string;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  IconComponent,
  isPending,
  isErrored,
  actionText,
  name,
  onSubmit,
}) => {
  const classes = styles();

  return (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label={name}
      name={name}
      className={classes.fabButton}
      type="submit"
      onClick={onSubmit}
    >
      <div className={classes.buttonIcon}>
        {isPending ? (
          <CircularProgress
            color="secondary"
            size={25}
            aria-label="circular-pending"
          />
        ) : isErrored ? (
          <ErrorIcon />
        ) : (
          <IconComponent />
        )}
      </div>
      <div className={classes.buttonText}>
        <Typography>{actionText}</Typography>
      </div>
    </Fab>
  );
};

export default FeedbackButton;
