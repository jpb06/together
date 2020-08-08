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

  React.useEffect(() => {
    const currentTeam = localStore.get<BareTeam | undefined>(
      LocalStorageKeys.currentTeam
    );

    if (currentTeam) {
      dispatch(getTeamMembersAction(currentTeam.id));
    }
  }, [dispatch]);

  return teamMembers;
};
