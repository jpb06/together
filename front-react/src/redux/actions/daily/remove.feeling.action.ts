import { ThunkResult, ActionResult } from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import * as TogetherApi from "../../../api/daily/remove.feeling";
import { ApiStatus } from "../../../api/setup/together.api";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "../util/generic.actions";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../begin.api.call.action";

const removeFeelingAction = (
  teamId: string,
  date: string,
  id: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(
    beginDailyApiCallAction({
      type: DailyFeedbackType.RemoveFeeling,
      term: id,
    })
  );

  const result = await TogetherApi.removeFeeling(teamId, date, id);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      dailyAlterationFailure(DailyFeedbackType.RemoveFeeling, result.error)
    );
    return { success: false, message: result.error?.message };
  }

  dispatch(dailyAlterationSuccess(DailyFeedbackType.RemoveFeeling, id));
  return { success: true };
};

export default removeFeelingAction;
