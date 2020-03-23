import { validateResponse, ApiResponse } from "./response.validation";
import User from "../../types/user.type";
import { AxiosResponse } from "axios";

export interface ApiLoginResponse extends ApiResponse {
  token: string;
  user: User;
  expirationDate: string;
}

const validateLoginResult = (result: AxiosResponse<ApiLoginResponse>) =>
  validateResponse(result) &&
  result.data.token &&
  result.data.user &&
  result.data.expirationDate;

export { validateLoginResult };
