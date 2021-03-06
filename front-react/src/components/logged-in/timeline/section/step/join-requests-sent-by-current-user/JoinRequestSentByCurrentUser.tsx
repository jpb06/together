import React from "react";

import { Typography } from "@material-ui/core";

import { TeamJoinRequest } from "../../../../../../stack-shared-code/types";
import styles from "./JoinRequestSentByCurrentUser.styles";

interface JoinRequestSentByCurrentUserProps {
  request: TeamJoinRequest;
}

const JoinRequestSentByCurrentUser: React.FC<JoinRequestSentByCurrentUserProps> = ({
  request,
}) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      You sent a request to join team{" "}
      <Typography component="span" variant="body2" color="textSecondary">
        {request.team.name}
      </Typography>
      .
    </div>
  );
};

export default JoinRequestSentByCurrentUser;
