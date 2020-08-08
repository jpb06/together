import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { RemoveTicketParams, TicketRemovalType } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const removeTicketAction = (
  ticketType: TicketRemovalType,
  teamId: string,
  date: string,
  ticket: string,
  context: Context = Context.Global
) => {
  let actionType;
  switch (ticketType) {
    case TicketRemovalType.Done:
      actionType = Type.RemoveDoneTicket;
      break;
    case TicketRemovalType.Unforeseen:
      actionType = Type.RemoveUnforeseenTicket;
      break;
  }

  return sagaPayloadAction<RemoveTicketParams>(actionType, context, {
    ticketType,
    teamId,
    date,
    ticket,
  });
};
