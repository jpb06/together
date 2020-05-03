import * as localStorage from "local-storage";
import LocalStorageKeys from "./../logic/local.storage.keys";
import { useReduxSelector, useReduxDispatch } from "./../hooks/redux.hooks";
import BareTeam from "../types/team.type";
import React from "react";
import getTimelineAction from "../redux/actions/user/get.timeline.action";
import TimeLine from "../types/timeline.type";

const useTimelineLoading = (): [TimeLine | null, boolean] => {
  const dispatch = useReduxDispatch();

  const [initPerformed, setInitPerformed] = React.useState(false);
  const timeline = useReduxSelector((state) => state.timeline);
  const isReady = useReduxSelector(
    (state) => state.apiCallsInProgress === 0 && initPerformed
  );

  React.useEffect(() => {
    if (!timeline || !initPerformed) {
      const currentTeam = localStorage.get<BareTeam | undefined>(
        LocalStorageKeys.currentTeam
      );

      let id = currentTeam ? currentTeam.id : "";
      dispatch(getTimelineAction(id));
    }

    setInitPerformed(true);
  }, [dispatch, timeline, initPerformed]);

  return [timeline, isReady];
};

export default useTimelineLoading;
