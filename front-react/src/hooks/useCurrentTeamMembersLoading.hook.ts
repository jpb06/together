import * as localStorage from "local-storage";
import LocalStorageKeys from "./../logic/local.storage.keys";
import { useReduxSelector, useReduxDispatch } from "./../hooks/redux.hooks";
import BareTeam from "../types/team.type";
import React from "react";
import getTeamMembersAction from "../redux/actions/team/get.team.members.action";
import { TeamMember } from "../types/user.type";

const useCurrentTeamMembersLoading = (): [Array<TeamMember>, boolean] => {
  const dispatch = useReduxDispatch();

  const [initPerformed, setInitPerformed] = React.useState(false);
  const [callMade, setCallMade] = React.useState(false);
  const teamMembers = useReduxSelector((state) => state.teamMembers);
  const isReady = useReduxSelector(
    (state) => state.apiCallsInProgress === 0 && initPerformed
  );

  React.useEffect(() => {
    if (!callMade && (teamMembers.length === 0 || !initPerformed)) {
      const currentTeam = localStorage.get<BareTeam | undefined>(
        LocalStorageKeys.currentTeam
      );

      if (currentTeam) {
        dispatch(getTeamMembersAction((currentTeam as BareTeam).id));
        setCallMade(true);
      }
    }

    setInitPerformed(true);
  }, [dispatch, teamMembers, initPerformed, callMade]);

  return [teamMembers, isReady];
};

export default useCurrentTeamMembersLoading;
