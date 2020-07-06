import React from "react";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Grid from "@material-ui/core/Grid";
import styles from "./UserAccount.styles";
import UserAvatar from "../../generic/user-avatar/UserAvatar";
import User from "../../../types/user.type";
import { TeamWithLastActivity } from "../../../types/team.type";
import TeamsList from "./team-list/TeamsList";
import JoinRequestList from "./join-requests/JoinRequestList";

interface UserAccountProps {
  user: User;
  userTeams: Array<TeamWithLastActivity>;
  userCurrentTeam: TeamWithLastActivity | undefined;
  onLogoff: () => void;
}

const UserAccount: React.FC<UserAccountProps> = ({
  user,
  userTeams,
  userCurrentTeam,
  onLogoff,
}) => {
  const classes = styles();

  return (
    <Grid container spacing={1} direction="row">
      <Grid item md={12} xs={12}>
        <h1>My account</h1>
      </Grid>
      <Grid item md={6} xs={12}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <UserAvatar user={user} isBigAvatar />
            <Grid className={classes.centered}>
              <div
                className={classes.userName}
              >{`${user.firstName} ${user.lastName}`}</div>
              <div className={classes.userMail}>{user.email}</div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={6} xs={12}>
        <Paper className={classes.paper}>
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="logoff"
            className={classes.action}
          >
            <AssignmentIndIcon className={classes.actionIcon} />
            Edit my profile
          </Fab>

          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="logoff"
            className={classes.action}
            onClick={onLogoff}
          >
            <PowerSettingsNewIcon className={classes.actionIcon} />
            Logoff
          </Fab>
        </Paper>
      </Grid>
      {userTeams.length > 0 && userCurrentTeam !== undefined && (
        <>
          <Grid item md={12} xs={12}>
            <h1>My teams</h1>
          </Grid>
          <Grid item md={12} xs={12}>
            <Paper className={classes.paper}>
              <TeamsList
                user={user}
                teams={userTeams}
                currentTeam={userCurrentTeam}
              />
            </Paper>
          </Grid>
        </>
      )}
      {user.teamJoinRequests.length > 0 && (
        <>
          <Grid item md={12} xs={12}>
            <h1>Pending team join requests</h1>
          </Grid>
          <Grid item md={12} xs={12}>
            <Paper className={classes.paper}>
              <JoinRequestList joinRequests={user.teamJoinRequests} />
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserAccount;
