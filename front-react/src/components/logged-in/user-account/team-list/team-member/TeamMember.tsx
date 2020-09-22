import React from "react";

import Grid from "@material-ui/core/Grid";

import { TeamMember as TeamMemberType } from "../../../../../stack-shared-code/types";
import UserAvatar from "../../../../generic/user-avatar/UserAvatar";
import styles from "./TeamMember.styles";

interface TeamMemberProps {
  user: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ user }) => {
  const classes = styles();

  return (
    <Grid item md={3} xs={6} className={classes.root}>
      <Grid container justify="center">
        <UserAvatar user={user} isBigAvatar={false} />
      </Grid>
      <div className={classes.userName}>
        {`${user.firstName} ${user.lastName}`}
      </div>
      {user.status && <div>{user.status}</div>}
    </Grid>
  );
};

export default TeamMember;
