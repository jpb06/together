import { AxiosResponse } from "axios";
import { call } from "redux-saga/effects";

import { send } from "../../../api/setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

export function* apiCallTask<TData>(apiCall: Promise<AxiosResponse<TData>>) {
  const result: ApiResponse<TData> = yield call(send, apiCall);
  if (result.success) {
    return result.payload as TData;
  } else {
    throw new Error(result.error);
  }
}
