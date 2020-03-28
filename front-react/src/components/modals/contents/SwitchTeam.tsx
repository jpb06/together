import List from "@material-ui/core/List";
import React from "react";
import styles from "./SwitchTeam.styles";
import BareTeam, { TeamWithLastActivity } from "../../../types/team.type";
import SwitchTeamChoice from "./SwitchTeamChoice";
import { Typography } from "@material-ui/core";
import { useReduxDispatch } from "../../../hooks/redux.hooks";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../../logic/local.storage.keys";
import getTimelineAction from "../../../redux/actions/get.timeline.action";

interface SwitchTeamProps {
  teams: Array<TeamWithLastActivity>;
  currentTeamId: string;
  joinedTeamName: string;
  onClose: () => void;
}

const SwitchTeam: React.FC<SwitchTeamProps> = ({
  teams,
  currentTeamId,
  joinedTeamName,
  onClose
}) => {
  const classes = styles();
  const dispatch = useReduxDispatch();

  const handleTeamSelected = (team: BareTeam) => {
    if (team.id !== currentTeamId) {
      localStorage.set(LocalStorageKeys.currentTeam, team);
      dispatch(getTimelineAction(team.id));
      onClose();
    }
  };

  return (
    <div>
      <div className={classes.text}>
        Congratulations! You just joined team{" "}
        <Typography color="textSecondary">{joinedTeamName}</Typography>. Would
        you like to switch team?
      </div>
      <List disablePadding={true}>
        {teams.map((team: TeamWithLastActivity) => (
          <SwitchTeamChoice
            team={team}
            currentTeamId={currentTeamId}
            onTeamSelected={handleTeamSelected}
          />
        ))}
      </List>
    </div>
  );
};

export default SwitchTeam;
