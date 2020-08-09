import * as localStore from "local-storage";
import React from "react";
import { useDispatch } from "react-redux";

import LocalStorageKeys from "../logic/local.storage.keys";
import { getDailyAndTeamMembersAction } from "../redux/actions";
import { dailySelector, teamMembersSelector } from "../redux/selectors";
import { BareTeam, Daily, TeamMember } from "../types/shared";
import { useRootSelector } from "./use.root.selector";

export const useDailyAndTeamMembersLoading = (): [
  Daily | null,
  Array<TeamMember>
] => {
  const date = new Date();
  const dateAsUTCString = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toUTCString();

  const dispatch = useDispatch();
  const daily = useRootSelector(dailySelector);
  const teamMembers = useRootSelector(teamMembersSelector);

  React.useEffect(() => {
    const currentTeam = localStore.get<BareTeam | undefined>(
      LocalStorageKeys.currentTeam
    );

    if (currentTeam) {
      dispatch(getDailyAndTeamMembersAction(currentTeam.id, dateAsUTCString));
    }
  }, [dispatch, dateAsUTCString]);

  return [daily, teamMembers];
};
