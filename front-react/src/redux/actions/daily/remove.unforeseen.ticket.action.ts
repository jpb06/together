import { ThunkResult, ActionResult } from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import * as TogetherApi from "../../../api/daily/remove.ticket";
import { ApiStatus } from "../../../api/setup/together.api";
import {
  dailyAlterationFailure,
  dailyAlterationSuccess,
} from "../util/generic.actions";
import {
  beginDailyApiCallAction,
  DailyFeedbackType,
} from "../begin.api.call.action";

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
    return { success: false, message: result.error };
  }

  dispatch(
    dailyAlterationSuccess(DailyFeedbackType.RemoveUnforeseenTicket, key)
  );
  return { success: true };
};

export default removeUnforeseenTicketAction;
