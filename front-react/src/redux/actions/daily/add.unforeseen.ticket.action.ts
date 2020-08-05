import { ReduxActionType as Type } from "../../../types/redux";
import { AddUnforeseenTicketParams } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

export const addUnforeseenTicketAction = (
  teamId: string,
  date: string,
  ticket: string
) =>
  payloadAction<AddUnforeseenTicketParams>(Type.AddUnforeseenTicket, {
    teamId,
    date,
    ticket,
  });
