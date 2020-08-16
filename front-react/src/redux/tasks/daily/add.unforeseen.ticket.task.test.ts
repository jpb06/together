import { call, put } from "redux-saga/effects";

import { addUnforeseenTicketTask, apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = {
    teamId: "500",
    date: new Date().toISOString(),
    ticket: "RE-228",
  };
  const task = addUnforeseenTicketTask(params, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.DailyUnforeseenAdd, params)
    )
  );

  const newTicketMockData = {
    id: "326",
    name: params.ticket,
  };
  expect(task.next(newTicketMockData as any).value).toEqual(
    put(
      successPayloadAction(Type.AddUnforeseenTicket, context, newTicketMockData)
    )
  );

  expect(task.next().done).toBe(true);
};

describe("Daily unforeseen tickets creation task", () => {
  it("should create a ticket", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
