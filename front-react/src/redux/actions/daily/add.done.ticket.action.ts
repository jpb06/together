import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { AddDoneTicketParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const addDoneTicketAction = (
  teamId: string,
  assigneeEmail: string,
  date: string,
  ticket: string,
  context: Context = Context.Global
) =>
  sagaPayloadAction<AddDoneTicketParams>(Type.AddDoneTicket, context, {
    teamId,
    assigneeEmail,
    date,
    ticket,
  });
