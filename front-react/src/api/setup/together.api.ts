import axios, { AxiosInstance, AxiosResponse } from "axios";
import setInterceptors from "./axios.interceptors";
import apiUrl from "./../private/current.config";
import { History, LocationState } from "history";

export enum ApiStatus {
  Ok,
  Error
}

export interface ApiResponse {
  apiStatus: ApiStatus;
  error?: any;
  data?: any;
}

export default class TogetherApi {
  static requiresSetup = true;
  static Instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
    // `validateStatus` defines whether to resolve or reject the promise for a given HTTP response status code.
    // If `validateStatus` returns `true` (or is set to `null` or `undefined`),
    // the promise will be resolved; otherwise, the promise will be rejected.
    validateStatus: status => status >= 200 && status < 300, // default
    params: {} // do not remove this, its added to add params later in the config
  });

  static setup = (history: History<LocationState>) => {
    if (TogetherApi.requiresSetup) {
      console.log("Configuring API ...");
      setInterceptors(TogetherApi.Instance, history);
      TogetherApi.requiresSetup = false;
    }
  };
}

const asApiResponse = (response: AxiosResponse<any>): ApiResponse => ({
  apiStatus: ApiStatus.Ok,
  data: response.data.data
});

const send = async (apiCall: Promise<any>) => {
  try {
    const result = await apiCall;
    return asApiResponse(result);
  } catch (error) {
    return error as ApiResponse;
  }
};

export { apiUrl, send };
