import * as localStorage from "local-storage";
import LocalStorageKeys from "./../logic/local.storage.keys";
import { useReduxSelector, useReduxDispatch } from "./../hooks/redux.hooks";
import BareTeam from "../types/team.type";
import React from "react";
import getDailyAction from "../redux/actions/daily/get.daily.action";
import Daily from "../types/daily.type";

const useDailyLoading = (date: string): [Daily | null, boolean] => {
  const dispatch = useReduxDispatch();

  const [initPerformed, setInitPerformed] = React.useState(false);
  const daily = useReduxSelector((state) => state.daily);
  const isReady = useReduxSelector(
    (state) => state.apiCallsInProgress === 0 && initPerformed
  );

  React.useEffect(() => {
    if (!daily || !initPerformed) {
      const currentTeam = localStorage.get<BareTeam | undefined>(
        LocalStorageKeys.currentTeam
      );

      if (currentTeam) {
        dispatch(getDailyAction((currentTeam as BareTeam).id, date));
      }
    }

    setInitPerformed(true);
  }, [dispatch, daily, date, initPerformed]);

  return [daily, isReady];
};

export default useDailyLoading;
