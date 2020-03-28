import React from "react";
import styles from "./JoinRequestToCurrentTeam.styles";
import { Typography } from "@material-ui/core";
import { UserJoinRequest } from "../../../../../../types/user.type";

interface JoinRequestToCurrentTeamProps {
  request: UserJoinRequest;
}

const JoinRequestToCurrentTeam: React.FC<JoinRequestToCurrentTeamProps> = ({
  request
}) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography color="textSecondary">{`${request.user.firstName} ${request.user.lastName}`}</Typography>{" "}
      has asked to join the team.
    </div>
  );
};

export default JoinRequestToCurrentTeam;
