import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import styles from "./PendingDeleteButton.styles";

const PendingDeleteButton = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <IconButton
        edge="end"
        aria-label="delete"
        className={classes.actionInProgress}
      >
        <DeleteIcon />
      </IconButton>
      <CircularProgress className={classes.spinner} color="primary" size={48} />
    </div>
  );
};

export default PendingDeleteButton;
