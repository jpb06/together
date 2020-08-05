import { put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { Ticket } from "../../../types/shared";
import { successPayloadAction } from "../../actions";
import { apiCall } from "../../sagas";

export interface AddDoneTicketParams {
  teamId: string;
  assigneeEmail: string;
  date: string;
  ticket: string;
}

export function* addDoneTicketTask(
  params: AddDoneTicketParams,
  context: Context
) {
  const ticket: Ticket = yield apiCall(
    TogetherApi.Instance.post(ApiRoutes.DailyDoneAdd, params)
  );

  yield put(successPayloadAction(Type.AddDoneTicket, context, ticket));

  return ticket;
}
