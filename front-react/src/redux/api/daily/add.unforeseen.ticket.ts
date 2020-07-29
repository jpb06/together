import { call, put } from "redux-saga/effects";

import { Ticket } from "../../../../../shared/types";
import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

export interface AddUnforeseenTicketParams {
  teamId: string;
  date: string;
  ticket: string;
}

export interface AddUnforeseenTicketResult {
  data?: Ticket;
}

export function* addUnforeseenTicket(params: AddUnforeseenTicketParams) {
  const result: AddUnforeseenTicketResult = yield call(
    send,
    TogetherApi.Instance.post(ApiRoutes.DailyUnforeseenAdd, params)
  );

  yield put(payloadAction(Type.AddUnforeseenTicketSuccess, result.data));

  return result.data;
}
