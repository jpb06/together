import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { AddUnforeseenTicketParams } from "../../tasks";
import { sagaPayloadAction } from "../generic/payload.action";

export const addUnforeseenTicketAction = (
  teamId: string,
  date: string,
  ticket: string
) =>
  sagaPayloadAction<AddUnforeseenTicketParams>(
    Type.AddUnforeseenTicket,
    Context.Daily,
    {
      teamId,
      date,
      ticket,
    }
  );
