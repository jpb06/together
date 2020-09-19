import React from "react";
import { useDispatch } from "react-redux";

import { getUserTeamsAction } from "../redux/actions";
import { userTeamsSelector } from "../redux/selectors";
import { TeamWithLastActivity, User } from "../stack-shared-code/types";
import { useRootSelector } from "./use.root.selector";

export const useUserTeamsLoading = (
  user: User | null
): Array<TeamWithLastActivity> => {
  const dispatch = useDispatch();
  const userTeams = useRootSelector(userTeamsSelector);

  React.useEffect(() => {
    if (user) dispatch(getUserTeamsAction(user.id, false));
  }, [dispatch, user]);

  return userTeams;
};
