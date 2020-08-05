import { AxiosResponse } from "axios";
import { call } from "redux-saga/effects";

import { send } from "../../../api/setup/together.api";
import { ApiCallResult } from "../../../types/api/api.logged.call.result.interface";

export function* apiCall<TData>(apiCall: Promise<AxiosResponse<TData>>) {
  const result: ApiCallResult<TData> = yield call(send, apiCall);
  return result.payload as TData;
}
