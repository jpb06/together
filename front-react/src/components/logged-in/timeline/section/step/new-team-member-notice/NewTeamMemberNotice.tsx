import React from "react";

import { Typography } from "@material-ui/core";

import { TeamMember } from "../../../../../../stack-shared-code/types";
import styles from "./NewTeamMemberNotice.styles";

interface NewTeamMemberNoticeProps {
  member: TeamMember;
}

const NewTeamMemberNotice: React.FC<NewTeamMemberNoticeProps> = ({
  member,
}) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography
        component="span"
        variant="body2"
        color="textSecondary"
      >{`${member.firstName} ${member.lastName}`}</Typography>{" "}
      {member.status === "Creator" ? "created the team." : "joined the team!"}
    </div>
  );
};

export default NewTeamMemberNotice;
