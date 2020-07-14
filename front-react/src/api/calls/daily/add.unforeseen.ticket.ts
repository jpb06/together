import TogetherApi, { send } from "../../setup/together.api";
import { CreatedTicket } from "../../../types/ticket.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiAddUnforeseenTicketResponse {
  data?: CreatedTicket;
}

export const addUnforeseenTicket = async (
  teamId: string,
  date: string,
  ticket: string
): Promise<ApiResponse<ApiAddUnforeseenTicketResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/unforeseen/add", {
      teamId,
      date,
      ticket,
    })
  );
