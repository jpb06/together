import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import styles from "./Team.styles";
import { TeamMember as TeamMemberType } from "../../../../types/user.type";
import TeamMember from "./team-member/TeamMember";

interface TeamProps {
  activePanel: string | boolean;
  name: string;
  members: Array<TeamMemberType>;
  onPanelChange: (
    name: string
  ) => (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}

const Team: React.FC<TeamProps> = ({
  activePanel,
  name,
  members,
  onPanelChange
}) => {
  const classes = styles();

  return (
    <ExpansionPanel
      expanded={activePanel === name}
      onChange={onPanelChange(name)}
      className={classes.container}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {members.map(user => (
            <TeamMember key={user.id} user={user} />
          ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Team;