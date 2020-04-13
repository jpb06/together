import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { TeamWithLastActivity } from "../../../types/team.type";
import { Typography } from "@material-ui/core";
import styles from "./SwitchTeamChoice.styles";
import TeamAvatar from "../../generic/team-avatar/TeamAvatar";

interface SwitchTeamChoiceProps {
  currentTeamId: string;
  team: TeamWithLastActivity;
  onTeamSelected: (team: TeamWithLastActivity) => void;
}

const SwitchTeamChoice: React.FC<SwitchTeamChoiceProps> = ({
  currentTeamId,
  team,
  onTeamSelected,
}) => {
  const classes = styles();

  const handleClick = () => {
    onTeamSelected(team);
  };

  return (
    <ListItem
      key={team.id}
      disableGutters
      divider
      selected={team.id === currentTeamId}
      className={classes.teamItem}
      onClick={handleClick}
    >
      <ListItemAvatar>
        <TeamAvatar team={team} />
      </ListItemAvatar>
      <ListItemText
        classes={{
          primary:
            team.id === currentTeamId ? classes.title : classes.titlePrimary,
        }}
        primary={`Team ${team.name}`}
        secondary={
          <span>
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
            >{`${team.members.length} member${
              team.members.length > 1 ? "s" : ""
            }`}</Typography>
            <br />
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
            >{`Last activity - ${team.lastActivity}`}</Typography>
          </span>
        }
      />
    </ListItem>
  );
};

export default SwitchTeamChoice;
