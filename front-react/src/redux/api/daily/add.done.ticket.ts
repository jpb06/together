import { call, put } from "redux-saga/effects";

import { Ticket } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface AddDoneTicketParams {
  teamId: string;
  assigneeEmail: string;
  date: string;
  ticket: string;
}

export interface AddDoneTicketResult {
  data?: Ticket;
}

export function* addDoneTicket(params: AddDoneTicketParams) {
  const result: AddDoneTicketResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.DailyDoneAdd, params)
  );

  yield put(payloadAction(Type.AddDoneTicketSuccess, result.data));

  return result.data;
}
