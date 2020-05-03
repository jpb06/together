import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import SimpleButton from "../generic/buttons/SimpleButton";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DownTransition from "../generic/transitions/DownTransition";
import styles from "./BasicChoiceModal.styles";
import WaitingIndicator from "../generic/feedback/WaitingIndicator";

export interface BasicChoiceModalState {
  isOpened: boolean;
  isLoading: boolean;
  title: string;
  question: JSX.Element | string;
  accept: string;
  refuse: string;
}

interface BasicChoiceModalProps {
  state: BasicChoiceModalState;
  onClose: () => void;
  onConfirm: () => void;
}

const BasicChoiceModal: React.FC<BasicChoiceModalProps> = ({
  state,
  onClose,
  onConfirm,
}) => {
  const classes = styles();

  const handleClose = () => onClose();
  const handleConfirm = () => onConfirm();

  return (
    <Dialog
      open={state.isOpened}
      TransitionComponent={DownTransition}
      transitionDuration={500}
      maxWidth={"xs"}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
        {state.title}
      </DialogTitle>
      <DialogContent>
        {state.isLoading && (
          <WaitingIndicator
            hasBottomMargin
            IconComponent={AddCircleOutlineIcon}
            text="Please hold while our hamsters handle the request in our secret basement"
          />
        )}
        {!state.isLoading && (
          <DialogContentText id="alert-dialog-slide-description">
            {state.question}
          </DialogContentText>
        )}
      </DialogContent>
      {!state.isLoading && (
        <DialogActions>
          <SimpleButton text={state.accept} onClick={handleConfirm} />
          <SimpleButton text={state.refuse} onClick={handleClose} />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default BasicChoiceModal;
