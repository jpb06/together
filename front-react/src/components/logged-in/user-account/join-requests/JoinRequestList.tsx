import React from "react";
import { TeamJoinRequest } from "../../../../types/invites.type";
import styles from "../List.styles";
import { Grid, Paper } from "@material-ui/core";
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
