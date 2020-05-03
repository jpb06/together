import { ThunkResult, ActionResult } from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../begin.api.call.action";
import * as TogetherApi from "../../../api/daily/add.feeling";
import { ApiStatus } from "../../../api/setup/together.api";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "../util/generic.actions";
import { NewFeeling } from "../../../types/feeling.type";

const addFeelingAction = (
  teamId: string,
  date: string,
  feeling: NewFeeling
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginDailyApiCallAction({ type: DailyFeedbackType.AddFeeling }));

  const result = await TogetherApi.addFeeling(teamId, date, feeling);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      dailyAlterationFailure(DailyFeedbackType.AddFeeling, result.error)
    );
    return { success: false, message: result.error?.message };
  }

  dispatch(dailyAlterationSuccess(DailyFeedbackType.AddFeeling, result.data));
  return { success: true };
};

export default addFeelingAction;
