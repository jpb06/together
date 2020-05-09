import { Dispatch } from "react";
import { Action } from "redux";
import * as TogetherApi from "../../../api/user/get.timeline";
import { ApiStatus } from "../../../api/setup/together.api";
import { action } from "../global/generic.actions";
import TimeLine from "../../../types/timeline.type";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Type, Result } from "../../types/action.types";
import beginApiCallAction from "../global/begin.api.call.action";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.getTimeline;

const getTimelineAction = (
  teamId: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction(Context.Global));

  const result = await TogetherApi.getTimeline(teamId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      action(typeFor(type, Context.Global, Result.Failure), result.error)
    );
    return { success: false, message: result.error?.message };
  }

  const timeline = result.data as TimeLine;

  dispatch(action(typeFor(type, Context.Global, Result.Success), timeline));
  return { success: true };
};

export default getTimelineAction;
