import { call, put } from "redux-saga/effects";

import { apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

export enum TicketRemovalType {
  Unforeseen,
  Done,
}

export interface RemoveTicketParams {
  ticketType: TicketRemovalType;
  teamId: string;
  date: string;
  ticket: string;
}

const validateType = (ticketType: TicketRemovalType) => {
  if (
    ticketType !== TicketRemovalType.Done &&
    ticketType !== TicketRemovalType.Unforeseen
  )
    throw new Error(
      "Invalid type for removal: should be either done or unforeseen tickets"
    );
};

export function* removeTicketSubtask(
  params: RemoveTicketParams,
  route: ApiRoutes,
  successActionType: Type,
  context: Context
) {
  validateType(params.ticketType);

  const message: string = yield apiCallTask(
    TogetherApi.Instance.post(route, {
      teamId: params.teamId,
      date: params.date,
      ticket: params.ticket,
    })
  );

  yield put(successPayloadAction(successActionType, context, message));
}

export function* removeTicketTask(
  params: RemoveTicketParams,
  context: Context
) {
  let message;

  switch (params.ticketType) {
    case TicketRemovalType.Done:
      message = yield call(
        removeTicketSubtask,
        params,
        ApiRoutes.DailyDoneRemove,
        Type.RemoveDoneTicket,
        context
      );
      break;
    case TicketRemovalType.Unforeseen:
      message = yield call(
        removeTicketSubtask,
        params,
        ApiRoutes.DailyUnforeseenRemove,
        Type.RemoveUnforeseenTicket,
        context
      );
      break;
    default:
  }

  return message;
}
