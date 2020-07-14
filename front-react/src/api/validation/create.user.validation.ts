import { AxiosResponse } from "axios";
import { isResponseValid } from "./response.validation";
import { ApiResponse } from "../../types/api/api.response.interface";
import { CreateNewUserResult } from "../calls/anonymous/create.user.api";

export const isCreateUserResultValid = (
  result: AxiosResponse<ApiResponse<CreateNewUserResult>>
) => isResponseValid(result) && result.data;

export const isEmailAlreadyInUse = (error: any) =>
  error.response && error.response.status && error.response.status === 401;
