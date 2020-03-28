import React from "react";
import { Typography } from "@material-ui/core";

interface RefuseToJoinTeamProps {
  teamName: string;
}
const RefuseToJoinTeam: React.FC<RefuseToJoinTeamProps> = ({ teamName }) => {
  return (
    <>
      You are about to decline the invite to join team{" "}
      <Typography color="textSecondary">{teamName}</Typography>.<br />
      Do you really want to?
    </>
  );
};

export default RefuseToJoinTeam;
