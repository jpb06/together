import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./PendingDeleteButton.styles";

const PendingDeleteButton = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <IconButton edge="end" className={classes.actionInProgress}>
        <DeleteIcon titleAccess="delete-icon" />
      </IconButton>
      <CircularProgress
        className={classes.spinner}
        color="primary"
        size={48}
        aria-label="circular-pending"
      />
    </div>
  );
};

export default PendingDeleteButton;
