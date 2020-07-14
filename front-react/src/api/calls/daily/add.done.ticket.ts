import TogetherApi, { send } from "../../setup/together.api";
import { CreatedTicket } from "../../../types/ticket.type";
import { ApiResponse } from "../../../types/api/api.response.interface";

interface ApiAddDoneTicketResponse {
  data?: CreatedTicket;
}

export const addDoneTicket = async (
  teamId: string,
  assigneeEmail: string,
  date: string,
  ticket: string
): Promise<ApiResponse<ApiAddDoneTicketResponse>> =>
  await send(
    TogetherApi.Instance.post("daily/done/add", {
      teamId,
      assigneeEmail,
      date,
      ticket,
    })
  );
