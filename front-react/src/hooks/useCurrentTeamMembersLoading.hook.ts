import * as localStorage from "local-storage";
import LocalStorageKeys from "./../logic/local.storage.keys";
import { useReduxSelector, useReduxDispatch } from "./../hooks/redux.hooks";
import BareTeam from "../types/team.type";
import React from "react";
import getTeamMembersAction from "../redux/actions/team/get.team.members.action";
import { TeamMember } from "../types/user.type";

const useCurrentTeamMembersLoading = (): Array<TeamMember> => {
  const dispatch = useReduxDispatch();
  const teamMembers = useReduxSelector((state) => state.teamMembers);

  React.useEffect(() => {
    console.log("useCurrentTeamMembersLoading use effect");
    if (teamMembers.length === 0) {
      const currentTeam = localStorage.get<BareTeam>(
        LocalStorageKeys.currentTeam
      );
      dispatch(getTeamMembersAction(currentTeam.id));
    }
  }, [dispatch, teamMembers]);

  return teamMembers;
};

export default useCurrentTeamMembersLoading;
