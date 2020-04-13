import * as localStorage from "local-storage";
import LocalStorageKeys from "./../logic/local.storage.keys";
import { useReduxSelector, useReduxDispatch } from "./../hooks/redux.hooks";
import BareTeam from "../types/team.type";
import React from "react";
import getDailyAction from "../redux/actions/daily/get.daily.action";
import Daily from "../types/daily.type";

const useDailyLoading = (date: string): Daily | null => {
  const dispatch = useReduxDispatch();
  const daily = useReduxSelector((state) => state.daily);

  React.useEffect(() => {
    console.log("useDailyLoading use effect");
    if (!daily) {
      const currentTeam = localStorage.get<BareTeam>(
        LocalStorageKeys.currentTeam
      );
      dispatch(getDailyAction(currentTeam.id, date));
    }
  }, [dispatch, daily, date]);

  return daily;
};

export default useDailyLoading;
