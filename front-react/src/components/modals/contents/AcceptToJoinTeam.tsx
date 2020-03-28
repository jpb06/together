import React from "react";
import { Typography } from "@material-ui/core";

interface AcceptToJoinTeamProps {
  teamName: string;
}

const AcceptToJoinTeam: React.FC<AcceptToJoinTeamProps> = ({ teamName }) => {
  return (
    <>
      You are about to join team{" "}
      <Typography color="textSecondary">{teamName}</Typography>.<br />
      Are you sure, like really sure?
    </>
  );
};

export default AcceptToJoinTeam;
