import { Dispatch } from "react";
import { Action } from "redux";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../global/begin.api.call.action";
import * as TogetherApi from "../../../api/daily/add.unforeseen.ticket";
import { ApiStatus } from "../../../api/setup/together.api";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "./daily.generic.actions";

const addUnforeseenTicketAction = (
  teamId: string,
  date: string,
  key: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(
    beginDailyApiCallAction({ type: DailyFeedbackType.AddUnforeseenTicket })
  );

  const result = await TogetherApi.addUnforeseenTicket(teamId, date, key);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      dailyAlterationFailure(
        DailyFeedbackType.AddUnforeseenTicket,
        result.error
      )
    );
    return { success: false, message: result.error?.message };
  }

  dispatch(
    dailyAlterationSuccess(DailyFeedbackType.AddUnforeseenTicket, result.data)
  );
  return { success: true };
};

export default addUnforeseenTicketAction;
