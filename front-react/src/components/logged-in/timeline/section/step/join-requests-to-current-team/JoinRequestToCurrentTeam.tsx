import React from "react";

import { Typography } from "@material-ui/core";

import { UserJoinRequest } from "../../../../../../stack-shared-code/types";
import styles from "./JoinRequestToCurrentTeam.styles";

interface JoinRequestToCurrentTeamProps {
  request: UserJoinRequest;
}

const JoinRequestToCurrentTeam: React.FC<JoinRequestToCurrentTeamProps> = ({
  request,
}) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography
        component="span"
        variant="body2"
        color="textSecondary"
      >{`${request.user.firstName} ${request.user.lastName}`}</Typography>{" "}
      has asked to join the team.
    </div>
  );
};

export default JoinRequestToCurrentTeam;
