import { Dispatch } from "react";
import * as TogetherApi from "../../../api/anonymous/login.api";
import { action } from "../global/generic.actions";
import { Action } from "redux";
import beginApiCallAction from "../global/begin.api.call.action";
import { initializeLoggedUserContext } from "../../../logic/user.util";
import { ThunkResult } from "../../types/thunk.result";
import { ActionResult } from "../../types/action.result";
import { Context, Type, Result } from "../../types/action.types";
import { typeFor } from "../../logic/action-types/redux.action.type.generation";

const type = Type.login;

const loginAction = (
  email: string,
  password: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction(Context.Global));

  const failureActionType = typeFor(type, Context.Global, Result.Failure);

  try {
    const authResult = await TogetherApi.login(email, password);
    if (!authResult) {
      dispatch(action(failureActionType, "The authentication failed"));
      return { success: false };
    }

    const user = initializeLoggedUserContext(authResult);

    dispatch(action(typeFor(type, Context.Global, Result.Success), user));

    return { success: true };
  } catch (error) {
    dispatch(action(failureActionType, error.message));

    return { success: false };
  }
};

export { loginAction };
