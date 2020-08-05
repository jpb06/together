import axios from "axios";
import { History, LocationState } from "history";
import { call, put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { isResultValid } from "../../../api/validation/login.result.validation";
import { initializeLoggedUserContext } from "../../../logic/user.util";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { User } from "../../../types/shared";
import { payloadAction, successPayloadAction } from "../../actions";

export interface LoginParams {
  login: string;
  password: string;
  history: History<LocationState>;
}

export interface LoginResult {
  token: string;
  user: User;
  expirationDate: string;
}

export function* loginTask(params: LoginParams, context: Context) {
  const errorMessage = "The authentication failed";

  try {
    const result: ApiResponse<LoginResult> = yield call(
      send,
      axios.post(`${process.env.REACT_APP_API_URI}/${ApiRoutes.Login}`, {
        login: params.login,
        password: params.password,
      })
    );

    if (!isResultValid(result)) {
      console.log("Invalid response for Login");
      throw new Error(errorMessage);
    }

    const user = initializeLoggedUserContext(result.payload as LoginResult);

    TogetherApi.setup(params.history);

    if (context === Context.Global) {
      params.history.push({
        pathname: "/main",
      });
    }

    yield put(successPayloadAction(Type.Login, context, user));

    return user;
  } catch (error) {
    yield put(payloadAction(Type.LoginStateFailed));
    throw new Error(errorMessage);
  }
}
