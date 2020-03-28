import { AxiosResponse } from "axios";

export interface ApiResponse {
  status: number;
  error?: string;
}

const validateResponse = (result: AxiosResponse<ApiResponse>) =>
  result && result.data && result.data.status === 200;

export { validateResponse };
