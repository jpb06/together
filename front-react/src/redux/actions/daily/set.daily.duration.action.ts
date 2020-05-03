import { ThunkResult, ActionResult } from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import * as TogetherApi from "../../../api/daily/set.daily.duration";
import { ApiStatus } from "../../../api/setup/together.api";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "../util/generic.actions";
import {
  DailyFeedbackType,
  beginDailyApiCallAction,
} from "../begin.api.call.action";

const setDailyDurationAction = (
  teamId: string,
  date: string,
  duration: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginDailyApiCallAction({ type: DailyFeedbackType.Duration }));

  const result = await TogetherApi.setDailyDuration(teamId, date, duration);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(dailyAlterationFailure(DailyFeedbackType.Duration, result.error));
    return { success: false, message: result.error?.message };
  }

  dispatch(dailyAlterationSuccess(DailyFeedbackType.Duration, duration));
  return { success: true };
};

export default setDailyDurationAction;
