import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ThunkResult,
  ActionResult
} from "./util/action.types";
import { Dispatch } from "react";
import * as TogetherApi from "../../api/anonymous/login.api";
import { action } from "./util/generic.actions";
import { Action } from "redux";
import beginApiCallAction from "./begin.api.call.action";
import { initializeLoggedUserContext } from "../../logic/user.util";

const loginAction = (
  email: string,
  password: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCallAction());

  try {
    const authResult = await TogetherApi.login(email, password);
    if (!authResult) {
      dispatch(action(LOGIN_FAILURE, "The authentication failed"));
      return { success: false };
    }

    initializeLoggedUserContext(authResult);

    dispatch(action(LOGIN_SUCCESS, authResult.user));

    return { success: true };
  } catch (error) {
    dispatch(action(LOGIN_FAILURE, error.message));

    return { success: false };
  }
};

export { loginAction };
