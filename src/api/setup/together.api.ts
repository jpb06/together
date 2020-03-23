import axios, { AxiosInstance } from "axios";
import setInterceptors from "./axios.interceptors";
import apiUrl from "./../private/current.config";
import { History, LocationState } from "history";

export default class TogetherApi {
  static requiresSetup = true;
  static Instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 15000,
    // `validateStatus` defines whether to resolve or reject the promise for a given HTTP response status code.
    // If `validateStatus` returns `true` (or is set to `null` or `undefined`),
    // the promise will be resolved; otherwise, the promise will be rejected.
    validateStatus: undefined, // status >= 200 && status < 300; // default
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

const ensureStatus = (result: any) => {
  if (!result) result = { status: -1, data: undefined };

  return result;
};

export { apiUrl, ensureStatus };
