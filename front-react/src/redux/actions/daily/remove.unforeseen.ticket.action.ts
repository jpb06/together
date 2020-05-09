import { Dispatch } from "react";
import { Action } from "redux";
import * as TogetherApi from "../../../api/daily/remove.ticket";
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

const removeUnforeseenTicketAction = (
  teamId: string,
  date: string,
  key: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(
    beginDailyApiCallAction({
      type: DailyFeedbackType.RemoveUnforeseenTicket,
      term: key,
    })
  );

  const result = await TogetherApi.removeTicket(
    TogetherApi.TicketRemovalType.Unforeseen,
    teamId,
    date,
    key
  );
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      dailyAlterationFailure(
        DailyFeedbackType.RemoveUnforeseenTicket,
        result.error
      )
    );
    return { success: false, message: result.error?.message };
  }

  dispatch(
    dailyAlterationSuccess(DailyFeedbackType.RemoveUnforeseenTicket, key)
  );
  return { success: true };
};

export default removeUnforeseenTicketAction;
