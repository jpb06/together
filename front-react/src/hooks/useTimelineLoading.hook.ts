import * as localStorage from "local-storage";
import LocalStorageKeys from "./../logic/local.storage.keys";
import { useReduxSelector, useReduxDispatch } from "./../hooks/redux.hooks";
import BareTeam from "../types/team.type";
import React from "react";
import getTimelineAction from "../redux/actions/get.timeline.action";

const useTimelineLoading = () => {
  const dispatch = useReduxDispatch();
  const timeline = useReduxSelector(state => state.timeline);

  React.useEffect(() => {
    if (!timeline) {
      const currentTeam = localStorage.get<BareTeam>(
        LocalStorageKeys.currentTeam
      );
      dispatch(getTimelineAction(currentTeam.id));
    }
  }, [dispatch, timeline]);
};

export default useTimelineLoading;
