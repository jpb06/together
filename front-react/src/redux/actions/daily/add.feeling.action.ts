import { Dispatch } from "react";
import { Action } from "redux";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../global/begin.api.call.action";
import * as TogetherApi from "../../../api/daily/add.feeling";
import { ApiStatus } from "../../../api/setup/together.api";
import { NewFeeling } from "../../../types/feeling.type";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "./daily.generic.actions";

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
