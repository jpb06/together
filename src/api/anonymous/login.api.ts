import axios from "axios";
import { apiUrl } from "../setup/together.api";
import User from "../../types/user.type";
import {
  ApiLoginResponse,
  validateLoginResult
} from "../validation/login.result.validation";

export interface ApiLoginResult {
  token: string;
  user: User;
  expirationDate: string;
}

const login = async (
  email: string,
  password: string
): Promise<ApiLoginResult | undefined> => {
  try {
    const result = await axios.post<ApiLoginResponse>(`${apiUrl}/login`, {
      login: email,
      password: password
    });

    if (!validateLoginResult(result)) {
      console.log("Invalid response for Login");
      return undefined;
    }

    return {
      ...result.data
    };
  } catch (error) {
    //console.log(error.response.data);
    return undefined;
  }
};

export { login };
