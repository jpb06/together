import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import { CreatedTicket } from "../../types/ticket.type";

interface ApiAddUnforeseenTicketResponse {
  apiStatus: ApiStatus;
  data?: CreatedTicket;
  error?: any;
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
