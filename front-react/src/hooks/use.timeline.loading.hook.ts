import * as localStore from "local-storage";
import React from "react";
import { useDispatch } from "react-redux";

import LocalStorageKeys from "../logic/local.storage.keys";
import { getTimelineAction } from "../redux/actions";
import { timelineSelector } from "../redux/selectors/timeline.selector";
import { BareTeam, TimeLine } from "../types/shared";
import { useRootSelector } from "./use.root.selector";

export const useTimelineLoading = (): TimeLine | null => {
  const dispatch = useDispatch();
  const timeline = useRootSelector(timelineSelector);

  const [initPerformed, setInitPerformed] = React.useState(false);
  const [callMade, setCallMade] = React.useState(false);

  React.useEffect(() => {
    if (!callMade && (!timeline || !initPerformed)) {
      const currentTeam = localStore.get<BareTeam | undefined>(
        LocalStorageKeys.currentTeam
      );

      if (currentTeam) {
        dispatch(getTimelineAction(currentTeam.id));
        setCallMade(true);
      }
    }

    setInitPerformed(true);
  }, [dispatch, timeline, initPerformed, callMade]);

  return timeline;
};
