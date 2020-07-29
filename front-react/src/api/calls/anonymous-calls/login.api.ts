import axios from "axios";

import { User } from "../../../../../shared/types";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { isResultValid } from "../../validation/login.result.validation";

export interface ApiLoginParams {
  email: string;
  password: string;
}

export interface ApiLoginResult {
  token: string;
  user: User;
  expirationDate: string;
}

export const login = async (
  params: ApiLoginParams
): Promise<ApiLoginResult> => {
  const errorMessage = "The authentication failed";

  try {
    const result = await axios.post<ApiResponse<ApiLoginResult>>(
      `${process.env.REACT_APP_API_URI}/login`,
      params
    );

    if (!isResultValid(result)) {
      console.log("Invalid response for Login");
      throw new Error(errorMessage);
    }

    return result.data.payload as ApiLoginResult;
  } catch (error) {
    throw new Error(errorMessage);
  }
};
