import { AxiosResponse } from "axios";
import { ApiResponse } from "../../types/api/api.response.interface";

export const isResponseValid = <TData>(
  result: AxiosResponse<ApiResponse<TData>>,
  expectedStatus: number = 200
) =>
  result &&
  result.status === expectedStatus &&
  result.data &&
  result.data.payload;
