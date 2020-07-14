import TogetherApi, { send } from "../../setup/together.api";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiRemoveTicketResponse {
  data?: string;
}

export enum TicketRemovalType {
  Unforeseen,
  Done,
}

export const removeTicket = async (
  ticketType: TicketRemovalType,
  teamId: string,
  date: string,
  ticket: string
): Promise<ApiResponse<ApiRemoveTicketResponse>> => {
  const route = ticketType === TicketRemovalType.Done ? "done" : "unforeseen";

  return await send(
    TogetherApi.Instance.post(`daily/${route}/remove`, {
      teamId,
      date,
      ticket,
    })
  );
};
