import {
  ThunkResult,
  ActionResult,
  GET_TIMELINE_FAILURE,
  GET_TIMELINE_SUCCESS
} from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import beginApiCallAction from "../begin.api.call.action";
import * as TogetherApi from "../../../api/user/get.timeline";
import { ApiStatus } from "../../../api/setup/together.api";
import { action } from "../util/generic.actions";
import TimeLine from "../../../types/timeline.type";

const getTimelineAction = (
  teamId: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction());

  const result = await TogetherApi.getTimeline(teamId);
  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(GET_TIMELINE_FAILURE, result.error));
    return { success: false, message: result.error };
  }

  const timeline = result.data as TimeLine;

  dispatch(action(GET_TIMELINE_SUCCESS, timeline));
  return { success: true };
};

export default getTimelineAction;
