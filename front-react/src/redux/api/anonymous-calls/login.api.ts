import axios, { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";

import { User } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/api.routes.enum";
import { isResultValid } from "../../../api/validation/login.result.validation";
import { initializeLoggedUserContext } from "../../../logic/user.util";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
  expirationDate: string;
}

export function* login(credentials: LoginParams) {
  const errorMessage = "The authentication failed";

  try {
    const result: AxiosResponse<ApiResponse<LoginResult>> = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URI}/${ApiRoutes.Login}`,
      credentials
    );

    if (!isResultValid(result)) {
      console.log("Invalid response for Login");
      throw new Error(errorMessage);
    }

    const user = initializeLoggedUserContext(
      result.data.payload as LoginResult
    );

    yield put(payloadAction(Type.LoginSuccess, user));

    return user;
  } catch (error) {
    throw new Error(errorMessage);
  }
}
