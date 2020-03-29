import Grid from "@material-ui/core/Grid";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import styles from "./InviteUser.styles";

interface InviteUserProps {
  onUserInvite: () => void;
}

const InviteUser: React.FC<InviteUserProps> = ({ onUserInvite }) => {
  const classes = styles();

  return (
    <Grid item md={3} xs={6} className={classes.padding}>
      <Grid container justify="center">
        <Fab
          onClick={onUserInvite}
          color={"primary"}
          className={classes.inviteUser}
          aria-label="invite user"
        >
          <AddIcon />
        </Fab>
      </Grid>
      <div className={classes.text}>Invite user</div>
    </Grid>
  );
};

export default InviteUser;
