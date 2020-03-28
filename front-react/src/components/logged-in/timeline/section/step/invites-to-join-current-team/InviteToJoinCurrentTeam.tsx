import React, { useState } from "react";
import * as localStorage from "local-storage";
import styles from "./InviteToJoinCurrentTeam.styles";
import User, { UserInvite } from "../../../../../../types/user.type";
import LocalStorageKeys from "../../../../../../logic/local.storage.keys";
import { Typography } from "@material-ui/core";

interface InviteToJoinCurrentTeamProps {
  invite: UserInvite;
}

const InviteToJoinCurrentTeam: React.FC<InviteToJoinCurrentTeamProps> = ({
  invite
}) => {
  const classes = styles();

  const [currentUser] = useState<User>(localStorage.get(LocalStorageKeys.user));

  if (invite.referrer.id === currentUser.id) {
    return (
      <div className={classes.root}>
        You have invited{" "}
        <Typography
          component="span"
          variant="body2"
          color="textSecondary"
        >{`${invite.invitee.firstName} ${invite.invitee.lastName}`}</Typography>{" "}
        to join the team.
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Typography
          component="span"
          variant="body2"
          color="textSecondary"
        >{`${invite.referrer.firstName} ${invite.referrer.lastName}`}</Typography>{" "}
        has invited{" "}
        <Typography
          component="span"
          variant="body2"
          color="textSecondary"
        >{`${invite.invitee.firstName} ${invite.invitee.lastName}`}</Typography>{" "}
        to join the team.
      </div>
    );
  }
};

export default InviteToJoinCurrentTeam;
