import React from "react";
import styles from "./InviteToJoinCurrentTeam.styles";
import { UserInvite } from "../../../../../../types/user.type";
import { Typography } from "@material-ui/core";
import { useReduxSelector } from "../../../../../../hooks/redux.hooks";

interface InviteToJoinCurrentTeamProps {
  invite: UserInvite;
}

const InviteToJoinCurrentTeam: React.FC<InviteToJoinCurrentTeamProps> = ({
  invite
}) => {
  const classes = styles();

  const user = useReduxSelector(state => state.user);

  if (invite.referrer.id === user?.id) {
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
