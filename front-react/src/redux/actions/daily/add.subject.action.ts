import { Dispatch } from "react";
import { Action } from "redux";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../global/begin.api.call.action";
import * as TogetherApi from "../../../api/daily/add.subject";
import { ApiStatus } from "../../../api/setup/together.api";
import { NewSubject } from "../../../types/subject.type";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "./daily.generic.actions";

const addSubjectAction = (
  teamId: string,
  date: string,
  subject: NewSubject
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginDailyApiCallAction({ type: DailyFeedbackType.AddSubject }));

  const result = await TogetherApi.addSubject(teamId, date, subject);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      dailyAlterationFailure(DailyFeedbackType.AddSubject, result.error)
    );
    return { success: false, message: result.error?.message };
  }

  dispatch(dailyAlterationSuccess(DailyFeedbackType.AddSubject, result.data));
  return { success: true };
};

export default addSubjectAction;
