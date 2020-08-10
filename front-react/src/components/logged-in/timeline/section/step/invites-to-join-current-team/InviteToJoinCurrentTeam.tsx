import React from "react";
import { useSelector } from "react-redux";

import { Typography } from "@material-ui/core";

import { userSelector } from "../../../../../../redux/selectors";
import { InvitedUser } from "../../../../../../types/shared";
import styles from "./InviteToJoinCurrentTeam.styles";

interface InviteToJoinCurrentTeamProps {
  invite: InvitedUser;
}

const InviteToJoinCurrentTeam: React.FC<InviteToJoinCurrentTeamProps> = ({
  invite,
}) => {
  const classes = styles();

  const user = useSelector(userSelector);

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
