import { useReduxDispatch, useReduxSelector } from "./redux.hooks";
import React from "react";
import getUserTeamsAction from "../redux/actions/user/get.user.teams.action";
import User from "../types/user.type";
import { TeamWithLastActivity } from "../types/team.type";

const useUserTeamsLoading = (
  user: User | null
): [Array<TeamWithLastActivity>, boolean] => {
  const dispatch = useReduxDispatch();

  const [initPerformed, setInitPerformed] = React.useState(false);
  const userTeams = useReduxSelector((state) => state.userTeams);
  const isReady = useReduxSelector(
    (state) => state.apiCallsInProgress === 0 && initPerformed
  );

  React.useEffect(() => {
    if (user) {
      dispatch(getUserTeamsAction(user.id, false));
    }

    setInitPerformed(true);
  }, [dispatch, user]);

  return [userTeams, isReady];
};

export default useUserTeamsLoading;
