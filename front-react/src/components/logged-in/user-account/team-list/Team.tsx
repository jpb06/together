import React from "react";

import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { TeamMember as TeamMemberType } from "../../../../stack-shared-code/types";
import TeamMember from "./team-member/TeamMember";
import styles from "./Team.styles";

interface TeamProps {
  activePanel: string;
  id: string;
  name: string;
  members: Array<TeamMemberType>;
  onPanelChange: (id: string) => void;
}

const Team: React.FC<TeamProps> = ({
  activePanel,
  id,
  name,
  members,
  onPanelChange,
}) => {
  const classes = styles();

  const handlePanelChange = () => onPanelChange(id);

  return (
    <Accordion
      expanded={activePanel === id}
      onChange={handlePanelChange}
      className={classes.container}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {members.map((user) => (
            <TeamMember key={user.id} user={user} />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Team;
