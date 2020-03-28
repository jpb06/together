import axios from "axios";
import { apiUrl, ApiStatus } from "../setup/together.api";
import {
  validateCreateUserResult,
  isEmailAlreadyInUse
} from "../validation/create.user.result.validation";
import { TerseUser } from "../../types/user.type";

export enum CreateNewUserExtendedStatus {
  EmailAlreadyInUse
}

export type CreateNewUserStatus = ApiStatus | CreateNewUserExtendedStatus;

export interface CreateNewUserResult {
  status: CreateNewUserStatus;
  user?: TerseUser;
}

const createNewUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<CreateNewUserResult> => {
  try {
    const result = await axios.post(`${apiUrl}/user/create`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });

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
