import axios, { AxiosResponse } from "axios";
import { call } from "redux-saga/effects";

import { TerseUser } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/api.routes.enum";
import {
    isCreateUserResultValid, isEmailAlreadyInUse
} from "../../../api/validation/create.user.validation";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { login } from "./login.api";

export enum CreateUserStatus {
  Created,
  Error,
  EmailAlreadyInUse,
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserResult {
  status: CreateUserStatus;
  user?: TerseUser;
}

export function* createUser(user: CreateUserParams) {
  try {
    const result: AxiosResponse<ApiResponse<CreateUserResult>> = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URI}/${ApiRoutes.UserCreate}`,
      user
    );

    if (!isCreateUserResultValid(result)) {
      console.log("Invalid response for CreateUser");
      throw new Error("An error occured while creating your account");
    }

    yield login({ email: user.email, password: user.password });

    return result.data.payload as CreateUserResult;
  } catch (error) {
    throw new Error(
      isEmailAlreadyInUse(error)
        ? "This email is already in use"
        : "An error occured while creating your account"
    );
  }
}
