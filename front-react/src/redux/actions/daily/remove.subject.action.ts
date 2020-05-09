import { Dispatch } from "react";
import { Action } from "redux";
import * as TogetherApi from "../../../api/daily/remove.subject";
import { ApiStatus } from "../../../api/setup/together.api";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../global/begin.api.call.action";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "./daily.generic.actions";

const removeSubjectAction = (
  teamId: string,
  date: string,
  id: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(
    beginDailyApiCallAction({
      type: DailyFeedbackType.RemoveSubject,
      term: id,
    })
  );

  const result = await TogetherApi.removeSubject(teamId, date, id);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      dailyAlterationFailure(DailyFeedbackType.RemoveSubject, result.error)
    );
    return { success: false, message: result.error?.message };
  }

  dispatch(dailyAlterationSuccess(DailyFeedbackType.RemoveSubject, id));
  return { success: true };
};

export default removeSubjectAction;
