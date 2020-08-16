import { call, put } from "redux-saga/effects";

import { apiCallTask, removeTicketSubtask, removeTicketTask, TicketRemovalType } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (ticketType: TicketRemovalType, context: Context) => {
  const params = {
    teamId: "500",
    date: new Date().toISOString(),
    ticketType,
    ticket: "RE-228",
  };
  const task = removeTicketTask(params, context);

  switch (params.ticketType) {
    case TicketRemovalType.Done:
      expect(task.next().value).toEqual(
        call(
          removeTicketSubtask,
          params,
          ApiRoutes.DailyDoneRemove,
          Type.RemoveDoneTicket,
          context
        )
      );
      break;
    case TicketRemovalType.Unforeseen:
      expect(task.next().value).toEqual(
        call(
          removeTicketSubtask,
          params,
          ApiRoutes.DailyUnforeseenRemove,
          Type.RemoveUnforeseenTicket,
          context
        )
      );
      break;
  }

  expect(task.next().done).toBe(true);
};

describe("Daily ticket deletion task", () => {
  it("should delete a done ticket", () => {
    performTest(TicketRemovalType.Done, Context.Global);
  });

  it("should delete an unforeseen ticket", () => {
    performTest(TicketRemovalType.Unforeseen, Context.Onboarding);
  });
});
