import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import { CreatedTicket } from "../../types/ticket.type";

interface ApiAddUnforeseenTicketResponse extends ApiResponse {
  data?: CreatedTicket;
}

const addUnforeseenTicket = async (
  teamId: string,
  date: string,
  ticket: string
): Promise<ApiAddUnforeseenTicketResponse> =>
  await send(
    TogetherApi.Instance.post("daily/unforeseen/add", {
      teamId,
      date,
      ticket,
    })
  );

export { addUnforeseenTicket };
