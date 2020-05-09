import { Dispatch } from "react";
import { Action } from "redux";
import beginApiCallAction from "../global/begin.api.call.action";
import * as TogetherApi from "../../../api/daily/get.daily";
import { ApiStatus } from "../../../api/setup/together.api";
import { action } from "../global/generic.actions";
import Daily from "../../../types/daily.type";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Result, Type } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.getDaily;

const getDailyAction = (
  teamId: string,
  date: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction(Context.Global));

  const result = await TogetherApi.getDaily(teamId, date);

  if (result.apiStatus !== ApiStatus.Ok) {
    dispatch(
      action(typeFor(type, Context.Global, Result.Failure), result.error)
    );
    return { success: false, message: result.error?.message };
  }

  const daily = result.data as Daily;
  dispatch(action(typeFor(type, Context.Global, Result.Success), daily));
  return { success: true };
};

export default getDailyAction;
