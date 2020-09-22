import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";

import { DialogActions, Grid, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import MailIcon from "@material-ui/icons/Mail";

import { useRootSelector } from "../../hooks/use.root.selector";
import { validateEmail } from "../../logic/user.util";
import { inviteUserToTeamAction } from "../../redux/actions";
import { isAppBusyIn } from "../../redux/selectors";
import { ReduxActionContext as Context } from "../../types/redux";
import SimpleButton from "../generic/buttons/SimpleButton";
import WaitingIndicator from "../generic/loaders/WaitingIndicator";
import DownTransition from "../generic/transitions/DownTransition";
import styles from "./InviteUserToTeamModal.styles";

interface InviteUserToTeamModalProps {
  isOpened: boolean;
  teamId: string;
  onClose: () => void;
}

const InviteUserToTeamModal: React.FC<InviteUserToTeamModalProps> = ({
  isOpened,
  teamId,
  onClose,
}) => {
  const classes = styles();

  const dispatch = useDispatch();
  const isLoading = useRootSelector(isAppBusyIn(Context.Modal));

  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.currentTarget.value);

  const handleConfirm = () => {
    setIsSubmitted(true);

    const isEmailValid = validateEmail(email);
    if (!isEmailValid) return;

    dispatch(inviteUserToTeamAction(teamId, email, Context.Modal));
    setEmail("");
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
