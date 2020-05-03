import DownTransition from "../generic/transitions/DownTransition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import React from "react";

interface InviteUserToTeamModalProps {
  isOpened: boolean;
}

const InviteUserToTeamModal: React.FC<InviteUserToTeamModalProps> = ({
  isOpened,
}) => {
  return (
    <Dialog
      open={isOpened}
      TransitionComponent={DownTransition}
      transitionDuration={500}
      maxWidth={"xs"}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Invite more users to your team
      </DialogTitle>
      <DialogContent>TODO</DialogContent>
    </Dialog>
  );
};

export default InviteUserToTeamModal;
