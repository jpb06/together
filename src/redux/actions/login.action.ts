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
import { beginApiCall } from "./api.status.action";
import { initializeLoggedUserContext } from "../../types/user.type";

const loginAction = (
  email: string,
  password: string
): ThunkResult<Promise<ActionResult>> => async (dispatch: Dispatch<Action>) => {
  dispatch(beginApiCall());

  try {
    const authResult = await TogetherApi.login(email, password);
    if (!authResult) {
      dispatch(action(LOGIN_FAILURE, "Failure"));
      return { success: false, message: "Failure" };
    }

    initializeLoggedUserContext(authResult);

    dispatch(action(LOGIN_SUCCESS, authResult.user));

    return { success: true };
  } catch (error) {
    dispatch(action(LOGIN_FAILURE, error.message));

    return { success: false, message: error.message };
  }
};

export { loginAction };
