import { ReduxActionType as Type } from "../../../types/redux";
import { RemoveTicketParams, TicketRemovalType } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

export const removeTicketAction = (
  ticketType: TicketRemovalType,
  teamId: string,
  date: string,
  ticket: string
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

  return payloadAction<RemoveTicketParams>(actionType, {
    ticketType,
    teamId,
    date,
    ticket,
  });
};
