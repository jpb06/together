import { History, LocationState } from "history";
import { call, put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi, { sendAnonymous } from "../../../api/setup/together.api";
import { isResultValid } from "../../../api/validation/login.result.validation";
import { initializeLoggedUserContext } from "../../../logic/user.util";
import { LoggedUser } from "../../../stack-shared-code/types";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, successPayloadAction } from "../../actions";

export interface LoginParams {
  login: string;
  password: string;
  history: History<LocationState>;
}

export interface LoginResult {
  token: string;
  user: LoggedUser;
  expirationDate: string;
}

export function* loginTask(params: LoginParams, context: Context) {
  const errorMessage = "The authentication failed";

  try {
    const result: ApiResponse<LoginResult> = yield call(
      sendAnonymous,
      `${process.env.REACT_APP_API_URI}/${ApiRoutes.Login}`,
      {
        login: params.login,
        password: params.password,
      }
    );

    const isValid = yield call(isResultValid, result);
    if (!isValid) {
      throw new Error(errorMessage);
    }

    const user: LoggedUser = yield call(
      initializeLoggedUserContext,
      result.payload as LoginResult
    );

    yield call(TogetherApi.setup, params.history);

    yield put(successPayloadAction(Type.Login, context, user));
    yield put(payloadAction(Type.LoginStateReset));

    if (context === Context.Global) {
      params.history.push({
        pathname: "/main",
      });
    }

    return user;
  } catch (error) {
    yield put(payloadAction(Type.LoginStateFailed));
    throw new Error(errorMessage);
  }
}
