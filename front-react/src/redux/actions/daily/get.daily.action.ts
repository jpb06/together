import {
  ThunkResult,
  ActionResult,
  GET_DAILY_SUCCESS,
  GET_DAILY_FAILURE,
} from "../util/action.types";
import { Dispatch } from "react";
import { Action } from "redux";
import beginApiCallAction from "../begin.api.call.action";
import * as TogetherApi from "../../../api/daily/get.daily";
import { ApiStatus } from "../../../api/setup/together.api";
import { action } from "../util/generic.actions";
import Daily from "../../../types/daily.type";

const getDailyAction = (
  teamId: string,
  date: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction());

  const result = await TogetherApi.getDaily(teamId, date);

  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(action(GET_DAILY_FAILURE, result.error));
    return { success: false, message: result.error };
  }

  const daily = result.data as Daily;
  dispatch(action(GET_DAILY_SUCCESS, daily));
  return { success: true };
};

export default getDailyAction;
