import React from "react";

import { Grid } from "@material-ui/core";

import { TeamJoinRequest } from "../../../../stack-shared-code/types";
import TeamAvatar from "../../../generic/team-avatar/TeamAvatar";
import styles from "./JoinRequest.styles";

interface JoinRequestProps {
  request: TeamJoinRequest;
}

const JoinRequest: React.FC<JoinRequestProps> = ({ request }) => {
  const classes = styles();

  return (
    <Grid item md={3} xs={6} className={classes.root}>
      <Grid container justify="center">
        <TeamAvatar team={request.team} isBigAvatar={false} />
      </Grid>
      <div className={classes.yellowText}>{request.team.name}</div>
      <div>{new Date(request.date).toLocaleDateString("fr-FR")}</div>
    </Grid>
  );
};

export default JoinRequest;
