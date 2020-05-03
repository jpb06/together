import axios from "axios";
import { apiUrl, ApiStatus } from "../setup/together.api";
import {
  validateCreateUserResult,
  isEmailAlreadyInUse,
  ApiCreateUserResponse,
} from "../validation/create.user.result.validation";
import { TerseUser, NewUser } from "../../types/user.type";

export enum CreateNewUserExtendedStatus {
  EmailAlreadyInUse = 2,
}

export type CreateNewUserStatus = ApiStatus | CreateNewUserExtendedStatus;

export interface CreateNewUserResult {
  status: CreateNewUserStatus;
  user?: TerseUser;
}

const createNewUser = async (user: NewUser): Promise<CreateNewUserResult> => {
  try {
    const result = await axios.post<ApiCreateUserResponse>(
      `${apiUrl}/user/create`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }
    );

    if (!validateCreateUserResult(result)) {
      console.log("Invalid response for CreateUser");
      return { status: ApiStatus.Error };
    }

    return { status: ApiStatus.Ok, user: result.data.user };
  } catch (error) {
    let status: CreateNewUserStatus = ApiStatus.Error;

    if (isEmailAlreadyInUse(error))
      status = CreateNewUserExtendedStatus.EmailAlreadyInUse;

    return { status };
  }
};

export { createNewUser };
