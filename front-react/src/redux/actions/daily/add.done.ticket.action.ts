import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { AddDoneTicketParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const addDoneTicketAction = (
  teamId: string,
  assigneeEmail: string,
  date: string,
  ticket: string
) =>
  sagaPayloadAction<AddDoneTicketParams>(Type.AddDoneTicket, Context.Daily, {
    teamId,
    assigneeEmail,
    date,
    ticket,
  });
