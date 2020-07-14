import { AxiosResponse } from "axios";
import { ApiResponse } from "../../types/api/api.response.interface";
import { isResponseValid } from "./response.validation";
import { ApiLoginResult } from "../calls/anonymous/login.api";

export const isResultValid = (
  result: AxiosResponse<ApiResponse<ApiLoginResult>>
) => {
  const isValid = isResponseValid(result);
  if (!isValid) return false;

  const { token, user, expirationDate } = result.data.payload as ApiLoginResult;
  return token && user && expirationDate;
};
