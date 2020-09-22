import React, { useState } from "react";

import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Team as TeamType, User } from "../../../../stack-shared-code/types";
import InviteUserToTeamModal from "../../../modals/InviteUserToTeamModal";
import styles from "../List.styles";
import InviteUser from "./invite-user/InviteUser";
import Team from "./Team";
import TeamMember from "./team-member/TeamMember";

interface TeamsListProps {
  user: User;
  teams: Array<TeamType>;
  currentTeam: TeamType;
}

const TeamsList: React.FC<TeamsListProps> = ({ user, teams, currentTeam }) => {
  const classes = styles();

  const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);
  const [activeTeamPanel, setActiveTeamPanel] = React.useState(currentTeam.id);

  const handlePanelChange = (teamId: string) => setActiveTeamPanel(teamId);

  const handleOpenModal = () => setIsInviteModalOpened(true);
  const handleCloseModal = () => setIsInviteModalOpened(false);

  return (
    <>
      <Grid container direction="column" justify="flex-start">
        <h2>Current team</h2>
        <Paper className={classes.paper}>
          <Typography>{currentTeam.name}</Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {currentTeam.members &&
              currentTeam.members.map((user) => (
                <TeamMember key={user.id} user={user} />
              ))}
            {currentTeam.joinRequests &&
              currentTeam.joinRequests.map((request) => (
                <TeamMember
                  key={request.id}
                  user={{
                    ...request.user,
                    joinDate: request.date,
                    status: "candidate",
                  }}
                />
              ))}
            {currentTeam.invitedUsers &&
              currentTeam.invitedUsers.map((invite) => (
                <TeamMember
                  key={invite.id}
                  user={{
                    ...invite.invitee,
                    joinDate: invite.date,
                    status: "candidate",
                  }}
                />
              ))}
            <InviteUser onUserInvite={handleOpenModal} />
          </Grid>
        </Paper>
        {teams.length > 1 && <h2>Your others teams</h2>}
        {teams
          .filter((team) => team.id !== currentTeam.id)
          .map((team) => (
            <Team
              key={team.id}
              activePanel={activeTeamPanel}
              id={team.id}
              name={team.name}
              members={team.members}
              onPanelChange={handlePanelChange}
            />
          ))}
      </Grid>
      <InviteUserToTeamModal
        isOpened={isInviteModalOpened}
        teamId={currentTeam.id}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TeamsList;
