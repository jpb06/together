import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import React from "react";
import styles from "./FeedbackButton.styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

interface FeedbackButtonProps {
  IconComponent: OverridableComponent<SvgIconTypeMap>;
  isPending: boolean;
  isErrored: boolean;
  actionText: string;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  IconComponent,
  isPending,
  isErrored,
  actionText,
  onSubmit,
}) => {
  const classes = styles();

  return (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label="add"
      className={classes.fabButton}
      type="submit"
      onClick={onSubmit}
    >
      <div className={classes.buttonIcon}>
        {isPending ? (
          <CircularProgress color="secondary" size={25} />
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
