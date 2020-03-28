import React from "react";
import { TeamMember } from "../../../../../../types/user.type";
import styles from "./NewTeamMemberNotice.styles";
import { Typography } from "@material-ui/core";

interface NewTeamMemberNoticeProps {
  member: TeamMember;
}

const NewTeamMemberNotice: React.FC<NewTeamMemberNoticeProps> = ({
  member
}) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Typography color="textSecondary">{`${member.firstName} ${member.lastName}`}</Typography>{" "}
      {member.status === "creator" ? "created the team." : "joined the team!"}
    </div>
  );
};

export default NewTeamMemberNotice;
