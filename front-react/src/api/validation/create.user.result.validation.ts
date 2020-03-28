import { validateResponse, ApiResponse } from "./response.validation";
import { AxiosResponse } from "axios";
import { TerseUser } from "../../types/user.type";

export interface ApiCreateUserResponse extends ApiResponse {
  user: TerseUser;
}

const validateCreateUserResult = (
  result: AxiosResponse<ApiCreateUserResponse>
) => validateResponse(result) && result.data.user;

const isEmailAlreadyInUse = (error: any) =>
  error.response && error.response.status && error.response.status === 400;

export { validateCreateUserResult, isEmailAlreadyInUse };
