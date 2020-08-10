import * as localStore from "local-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LocalStorageKeys from "../logic/local.storage.keys";
import { getTimelineAction } from "../redux/actions";
import { timelineSelector } from "../redux/selectors/timeline.selector";
import { ReduxActionContext as Context } from "../types/redux";
import { BareTeam, TimeLine } from "../types/shared";
import { useRootSelector } from "./use.root.selector";

export const useTimelineLoading = (context: Context): TimeLine | null => {
  const timeline = useRootSelector(timelineSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentTeam = localStore.get<BareTeam | undefined>(
      LocalStorageKeys.currentTeam
    );

    dispatch(getTimelineAction(currentTeam?.id, context));
  }, [dispatch, context]);

  return timeline;
};
