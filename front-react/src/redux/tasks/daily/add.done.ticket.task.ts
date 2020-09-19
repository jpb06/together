import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { Ticket } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

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
  const ticket: Ticket = yield call(
    apiCallTask,
    TogetherApi.Instance.post(ApiRoutes.DailyDoneAdd, params)
  );

  yield put(successPayloadAction(Type.AddDoneTicket, context, ticket));

  return ticket;
}
