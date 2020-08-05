import * as localStore from "local-storage";
import React from "react";
import { useDispatch } from "react-redux";

import LocalStorageKeys from "../logic/local.storage.keys";
import { getTeamMembersAction } from "../redux/actions/team/get.team.members.action";
import { teamMembersSelector } from "../redux/selectors";
import { BareTeam, TeamMember } from "../types/shared";
import { useRootSelector } from "./use.root.selector";

export const useCurrentTeamMembersLoading = (): Array<TeamMember> => {
  const dispatch = useDispatch();
  const teamMembers = useRootSelector(teamMembersSelector);

  const [initPerformed, setInitPerformed] = React.useState(false);
  const [callMade, setCallMade] = React.useState(false);

  React.useEffect(() => {
    if (!callMade && (teamMembers.length === 0 || !initPerformed)) {
      const currentTeam = localStore.get<BareTeam | undefined>(
        LocalStorageKeys.currentTeam
      );

      if (currentTeam) {
        dispatch(getTeamMembersAction(currentTeam.id));
        setCallMade(true);
      }
    }

    setInitPerformed(true);
  }, [dispatch, teamMembers, initPerformed, callMade]);

  return teamMembers;
};
