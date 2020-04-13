import TogetherApi, { ApiStatus, send } from "../setup/together.api";
import { CreatedTicket } from "../../types/ticket.type";

interface ApiAddDoneTicketResponse {
  apiStatus: ApiStatus;
  data?: CreatedTicket;
  error?: any;
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
