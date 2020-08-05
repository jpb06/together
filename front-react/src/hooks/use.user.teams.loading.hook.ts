import React from "react";
import { useDispatch } from "react-redux";

import { getUserTeamsAction } from "../redux/actions";
import { userTeamsSelector } from "../redux/selectors";
import { TeamWithLastActivity, User } from "../types/shared";
import { useRootSelector } from "./use.root.selector";

export const useUserTeamsLoading = (
  user: User | null
): Array<TeamWithLastActivity> => {
  const dispatch = useDispatch();
  const userTeams = useRootSelector(userTeamsSelector);

  const [initPerformed, setInitPerformed] = React.useState(false);
  const [callMade, setCallMade] = React.useState(false);

  React.useEffect(() => {
    if (!callMade && (userTeams.length === 0 || !initPerformed) && user) {
      dispatch(getUserTeamsAction(user.id, false));
      setCallMade(true);
    }

    setInitPerformed(true);
  }, [dispatch, user, userTeams, initPerformed, callMade]);

  return userTeams;
};
