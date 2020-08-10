import React from "react";

import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";

import { BareTeam, TeamWithLastActivity } from "../../../types/shared";
import styles from "./SwitchTeam.styles";
import SwitchTeamChoice from "./SwitchTeamChoice";

interface SwitchTeamProps {
  teams: Array<TeamWithLastActivity>;
  currentTeamId: string;
  joinedTeamName: string;
  onSwitchTeam: (team?: BareTeam) => void;
}

const SwitchTeam: React.FC<SwitchTeamProps> = ({
  teams,
  currentTeamId,
  joinedTeamName,
  onSwitchTeam,
}) => {
  const classes = styles();

  return (
    <div>
      <div className={classes.text}>
        Congratulations! You just joined team{" "}
        <Typography component="span" variant="body2" color="textSecondary">
          {joinedTeamName}
        </Typography>
        . Would you like to switch team?
      </div>
      <List disablePadding>
        {teams.map((team: TeamWithLastActivity) => (
          <SwitchTeamChoice
            key={team.id}
            team={team}
            currentTeamId={currentTeamId}
            onTeamSelected={onSwitchTeam}
          />
        ))}
      </List>
    </div>
  );
};

export default SwitchTeam;
