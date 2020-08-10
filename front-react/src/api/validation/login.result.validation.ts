import { LoginResult } from "../../redux/tasks";
import { ApiResponse } from "../../types/api/api.response.interface";

export const isResultValid = (result: ApiResponse<LoginResult>) => {
  const { token, user, expirationDate } = result.payload as LoginResult;
  return token && user && expirationDate;
};
