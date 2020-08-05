import { ReduxActionType as Type } from "../../../types/redux";
import { AddDoneTicketParams } from "../../tasks";
import { payloadAction } from "../generic/payload.action";

export const addDoneTicketAction = (
  teamId: string,
  assigneeEmail: string,
  date: string,
  ticket: string
) =>
  payloadAction<AddDoneTicketParams>(Type.AddDoneTicket, {
    teamId,
    assigneeEmail,
    date,
    ticket,
  });
