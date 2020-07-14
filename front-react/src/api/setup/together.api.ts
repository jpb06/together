import axios, { AxiosInstance, AxiosResponse } from "axios";
import setInterceptors from "./axios.interceptors";
import { History, LocationState } from "history";
import { ApiResponse } from "../../types/api/api.response.interface";

export default class TogetherApi {
  static SetupRequired = true;
  static Instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    timeout: 15000,
    // `validateStatus` defines whether to resolve or reject the promise for a given HTTP response status code.
    // If `validateStatus` returns `true` (or is set to `null` or `undefined`),
    // the promise will be resolved; otherwise, the promise will be rejected.
    validateStatus: (status) => status >= 200 && status < 300, // default
    params: {}, // do not remove this, its added to add params later in the config
  });

  static setup = (history: History<LocationState>) => {
    if (TogetherApi.SetupRequired) {
      console.log("Configuring API ...");
      setInterceptors(TogetherApi.Instance, history);
      TogetherApi.SetupRequired = false;
    }
  };
}

export const send = async <TData>(
  apiCall: Promise<AxiosResponse<TData>>
): Promise<ApiResponse<TData>> => {
  try {
    const result = await apiCall;
    return {
      success: true,
      payload: result.data,
    };
  } catch (error) {
    return error as ApiResponse<never>;
  }
};
