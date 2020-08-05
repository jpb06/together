import axios from "axios";
import { History, LocationState } from "history";
import { call } from "redux-saga/effects";

import { loginTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import { send } from "../../../api/setup/together.api";
import {
    isCreateUserResultValid, isEmailAlreadyInUse
} from "../../../api/validation/create.user.validation";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { ReduxActionContext as Context } from "../../../types/redux";
import { TerseUser } from "../../../types/shared";

export enum CreateUserStatus {
  Created,
  Error,
  EmailAlreadyInUse,
}

export interface CreateUserParams {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  history: History<LocationState>;
}

export interface CreateUserResult {
  status: CreateUserStatus;
  user?: TerseUser;
}

export function* createUserTask(params: CreateUserParams, context: Context) {
  try {
    const result: ApiResponse<CreateUserResult> = yield call(
      send,
      axios.post(`${process.env.REACT_APP_API_URI}/${ApiRoutes.UserCreate}`, {
        lastName: params.lastName,
        firstName: params.firstName,
        email: params.email,
        password: params.password,
      })
    );

    if (!isCreateUserResultValid(result)) {
      console.log("Invalid response for CreateUser");
      throw new Error("An error occured while creating your account");
    }

    yield loginTask(
      {
        login: params.email,
        password: params.password,
        history: params.history,
      },
      context
    );

    return result.payload as CreateUserResult;
  } catch (error) {
    throw new Error(
      isEmailAlreadyInUse(error)
        ? "This email is already in use"
        : "An error occured while creating your account"
    );
  }
}