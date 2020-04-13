import TogetherApi, { ApiStatus, send } from "../setup/together.api";

export enum TicketRemovalType {
  Unforeseen,
  Done,
}

interface ApiRemoveTicketResponse {
  apiStatus: ApiStatus;
  data?: string;
  error?: any;
}

const removeTicket = async (
  ticketType: TicketRemovalType,
  teamId: string,
  date: string,
  ticket: string
): Promise<ApiRemoveTicketResponse> => {
  const route = ticketType === TicketRemovalType.Done ? "done" : "unforeseen";

  return await send(
    TogetherApi.Instance.post(`daily/${route}/remove`, {
      teamId,
      date,
      ticket,
    })
  );
};

export { removeTicket };
