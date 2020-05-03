import TogetherApi, { send, ApiResponse } from "../setup/together.api";
import { CreatedTicket } from "../../types/ticket.type";

interface ApiAddDoneTicketResponse extends ApiResponse {
  data?: CreatedTicket;
}

const addDoneTicket = async (
  teamId: string,
  assigneeEmail: string,
  date: string,
  ticket: string
): Promise<ApiAddDoneTicketResponse> =>
  await send(
    TogetherApi.Instance.post("daily/done/add", {
      teamId,
      assigneeEmail,
      date,
      ticket,
    })
  );

export { addDoneTicket };
