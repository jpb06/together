import { call, put } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/calls/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { ReduxActionType as Type } from "../../../types/redux";
import { payloadAction } from "../../actions";

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

export interface RemoveTicketResult {
  data?: string;
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

function* remove(
  params: RemoveTicketParams,
  route: ApiRoutes,
  successActionType: Type
) {
  validateType(params.ticketType);

  const result: RemoveTicketResult = yield call(
    send,
    TogetherApi.Instance.post(route, {
      teamId: params.teamId,
      date: params.date,
      ticket: params.ticket,
    })
  );

  yield put(payloadAction(successActionType, result.data));
}

export function* removeTicket(params: RemoveTicketParams) {
  let result;

  switch (params.ticketType) {
    case TicketRemovalType.Done:
      result = yield call(
        remove,
        params,
        ApiRoutes.DailyDoneRemove,
        Type.RemoveDoneTicketSuccess
      );
      break;
    case TicketRemovalType.Unforeseen:
      result = yield call(
        remove,
        params,
        ApiRoutes.DailyUnforeseenRemove,
        Type.RemoveUnforeseenTicketSuccess
      );
      break;
    default:
  }

  return result.data;
}
