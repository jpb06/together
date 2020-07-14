import axios from "axios";
import User from "../../../types/user.type";
import { ApiResponse } from "../../../types/api/api.response.interface";
import { isResultValid } from "../../validation/login.result.validation";

export interface ApiLoginResult {
  token: string;
  user: User;
  expirationDate: string;
}

export const login = async (
  email: string,
  password: string
): Promise<ApiLoginResult | undefined> => {
  try {
    const result = await axios.post<ApiResponse<ApiLoginResult>>(
      `${process.env.REACT_APP_API_URI}/login`,
      {
        login: email,
        password: password,
      }
    );

    if (!isResultValid(result)) {
      console.log("Invalid response for Login");
      return undefined;
    }

    return result.data.payload as ApiLoginResult;
  } catch (error) {
    return undefined;
  }
};
