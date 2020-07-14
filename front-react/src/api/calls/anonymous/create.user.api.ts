import axios from "axios";
import { TerseUser, NewUser } from "../../../types/user.type";
import { ApiResponse } from "../../../types/api/api.response.interface";
import {
  isCreateUserResultValid,
  isEmailAlreadyInUse,
} from "../../validation/create.user.validation";

export enum CreateNewUserStatus {
  Created,
  Error,
  EmailAlreadyInUse,
}

export interface CreateNewUserResult {
  status: CreateNewUserStatus;
  user?: TerseUser;
}

export const createNewUser = async (
  user: NewUser
): Promise<CreateNewUserResult> => {
  try {
    const result = await axios.post<ApiResponse<CreateNewUserResult>>(
      `${process.env.REACT_APP_API_URI}/user/create`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }
    );

    if (!isCreateUserResultValid(result)) {
      console.log("Invalid response for CreateUser");
      return { status: CreateNewUserStatus.Error };
    }

    return result.data.payload as CreateNewUserResult;
  } catch (error) {
    return {
      status: isEmailAlreadyInUse(error)
        ? CreateNewUserStatus.EmailAlreadyInUse
        : CreateNewUserStatus.Error,
    };
  }
};
