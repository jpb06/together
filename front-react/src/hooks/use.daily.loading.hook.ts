import * as localStore from "local-storage";
import React from "react";
import { useDispatch } from "react-redux";

import LocalStorageKeys from "../logic/local.storage.keys";
import { getDailyAction } from "../redux/actions";
import { dailySelector } from "../redux/selectors";
import { BareTeam, Daily } from "../types/shared";
import { useRootSelector } from "./use.root.selector";

export const useDailyLoading = (date: string): Daily | null => {
  const dispatch = useDispatch();
  const daily = useRootSelector(dailySelector);

  const [initPerformed, setInitPerformed] = React.useState(false);
  const [callMade, setCallMade] = React.useState(false);

  React.useEffect(() => {
    if (!callMade && (!daily || !initPerformed)) {
      const currentTeam = localStore.get<BareTeam | undefined>(
        LocalStorageKeys.currentTeam
      );

      if (currentTeam) {
        dispatch(getDailyAction(currentTeam.id, date));
        setCallMade(true);
      }
    }

    setInitPerformed(true);
  }, [dispatch, daily, date, initPerformed, callMade]);

  return daily;
};
