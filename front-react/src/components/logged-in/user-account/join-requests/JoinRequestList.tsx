import React from "react";

import { Grid, Paper } from "@material-ui/core";

import { TeamJoinRequest } from "../../../../stack-shared-code/types";
import styles from "../List.styles";
import JoinRequest from "./JoinRequest";

interface JoinRequestListProps {
  joinRequests: Array<TeamJoinRequest>;
}

const JoinRequestList: React.FC<JoinRequestListProps> = ({ joinRequests }) => {
  const classes = styles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        {joinRequests.map((request) => (
          <JoinRequest key={request.id} request={request} />
        ))}
      </Grid>
    </Paper>
  );
};

export default JoinRequestList;
