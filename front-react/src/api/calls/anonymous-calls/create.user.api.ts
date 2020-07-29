import axios from "axios";

import { TerseUser } from "../../../../../shared/types";
import { ApiResponse } from "../../../types/api/api.response.interface";
import {
    isCreateUserResultValid, isEmailAlreadyInUse
} from "../../validation/create.user.validation";

export enum ApiCreateUserStatus {
  Created,
  Error,
  EmailAlreadyInUse,
}

export interface ApiCreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ApiCreateUserResult {
  status: ApiCreateUserStatus;
  user?: TerseUser;
}

export const createUser = async (
  user: ApiCreateUserParams
): Promise<ApiCreateUserResult> => {
  try {
    const result = await axios.post<ApiResponse<ApiCreateUserResult>>(
      `${process.env.REACT_APP_API_URI}/user/create`,
      user
    );

    if (!isCreateUserResultValid(result)) {
      console.log("Invalid response for CreateUser");
      return { status: ApiCreateUserStatus.Error };
    }

    return result.data.payload as ApiCreateUserResult;
  } catch (error) {
    return {
      status: isEmailAlreadyInUse(error)
        ? ApiCreateUserStatus.EmailAlreadyInUse
        : ApiCreateUserStatus.Error,
    };
  }
};
