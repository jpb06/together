import React from "react";
import styles from "./JoinRequestSentByCurrentUser.styles";
import { Typography } from "@material-ui/core";
import { TeamJoinRequest } from "../../../../../../types/invites.type";

interface JoinRequestSentByCurrentUserProps {
  request: TeamJoinRequest;
}

const JoinRequestSentByCurrentUser: React.FC<JoinRequestSentByCurrentUserProps> = ({
  request
}) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      You sent a request to join team{" "}
      <Typography color="textSecondary">{request.team.name}</Typography>.
    </div>
  );
};

export default JoinRequestSentByCurrentUser;
