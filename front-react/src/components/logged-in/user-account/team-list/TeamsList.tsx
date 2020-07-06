import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styles from "../List.styles";
import { Team as TeamType } from "../../../../types/team.type";
import TeamMember from "./team-member/TeamMember";
import InviteUser from "./invite-user/InviteUser";
import Team from "./Team";
import InviteUserToTeamModal from "../../../modals/InviteUserToTeamModal";
import User from "../../../../types/user.type";

interface TeamsListProps {
  user: User;
  teams: Array<TeamType>;
  currentTeam: TeamType;
}

const TeamsList: React.FC<TeamsListProps> = ({ user, teams, currentTeam }) => {
  const classes = styles();

  const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);
  const [activeTeamPanel, setActiveTeamPanel] = React.useState<string | false>(
    false
  );

  const handlePanelChange = (panelName: string) => () => {
    setActiveTeamPanel(activeTeamPanel ? panelName : false);
  };

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
              name={team.name}
              members={team.members}
              onPanelChange={handlePanelChange}
            />
          ))}
      </Grid>
      <InviteUserToTeamModal
        isOpened={isInviteModalOpened}
        userId={user.id}
        teamId={currentTeam.id}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TeamsList;
