import DownTransition from "../generic/transitions/DownTransition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import { TextField, DialogActions, Grid } from "@material-ui/core";
import SimpleButton from "../generic/buttons/SimpleButton";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import clsx from "clsx";
import styles from "./InviteUserToTeamModal.styles";
import { useReduxDispatch, useReduxSelector } from "../../hooks/redux.hooks";
import inviteUserToTeamAction from "../../redux/actions/account-creation/invite.user.to.team.action";
import { Context } from "../../redux/types/action.types";
import { validateEmail } from "../../logic/user.util";
import WaitingIndicator from "../generic/feedback/WaitingIndicator";
import MailIcon from "@material-ui/icons/Mail";
import getUserTeamsAction from "../../redux/actions/user/get.user.teams.action";

interface InviteUserToTeamModalProps {
  isOpened: boolean;
  userId: string;
  teamId: string;
  onClose: () => void;
}

const InviteUserToTeamModal: React.FC<InviteUserToTeamModalProps> = ({
  isOpened,
  userId,
  teamId,
  onClose,
}) => {
  const classes = styles();

  const dispatch = useReduxDispatch();

  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.currentTarget.value);

  const handleConfirm = async () => {
    setIsSubmitted(true);

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    setIsLoading(true);

    const result = await dispatch(
      inviteUserToTeamAction(teamId, email, Context.Modal)
    );
    if (result.success) {
      onClose();
      await dispatch(getUserTeamsAction(userId, false, Context.Modal));
    }

    setEmail("");
    setIsLoading(false);
  };

  return (
    <Dialog
      open={isOpened}
      TransitionComponent={DownTransition}
      transitionDuration={500}
      maxWidth="sm"
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.amber}>
        Invite users to your team
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row" justify="center" alignItems="center">
          {isLoading ? (
            <WaitingIndicator
              hasBottomMargin
              IconComponent={MailIcon}
              text="Sending invitation"
            />
          ) : (
            <GroupAddIcon className={clsx(classes.titleIcon, classes.amber)} />
          )}
        </Grid>
        {!isLoading && (
          <TextField
            required
            id="email"
            label="User email"
            name="email"
            type="email"
            margin="dense"
            variant="outlined"
            fullWidth
            value={email}
            error={isSubmitted && email === ""}
            onChange={handleChange}
          />
        )}
      </DialogContent>
      {!isLoading && (
        <DialogActions>
          <SimpleButton text="Send invite" onClick={handleConfirm} />
          <SimpleButton text="Close" onClick={onClose} />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default InviteUserToTeamModal;
