import * as localStore from "local-storage";
import React from "react";
import { useDispatch } from "react-redux";

import LocalStorageKeys from "../logic/local.storage.keys";
import { getDailyAction } from "../redux/actions";
import { dailySelector } from "../redux/selectors";
import { BareTeam, Daily } from "../stack-shared-code/types";
import { useRootSelector } from "./use.root.selector";

export const useDailyLoading = (): Daily | null => {
  const date = new Date();
  const dateAsUTCString = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toUTCString();

  const dispatch = useDispatch();
  const daily = useRootSelector(dailySelector);

  React.useEffect(() => {
    const currentTeam = localStore.get<BareTeam | undefined>(
      LocalStorageKeys.currentTeam
    );

    if (currentTeam) {
      dispatch(getDailyAction(currentTeam.id, dateAsUTCString));
    }
  }, [dispatch, dateAsUTCString]);

  return daily;
};
