import { call, put } from "redux-saga/effects";

import { addDoneTicketTask, apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = {
    teamId: "500",
    assigneeEmail: "yolo.mccool@great.org",
    date: new Date().toISOString(),
    ticket: "RE-228",
  };
  const task = addDoneTicketTask(params, context);

  expect(task.next().value).toEqual(
    call(apiCallTask, TogetherApi.Instance.post(ApiRoutes.DailyDoneAdd, params))
  );

  const newTicketMockData = {
    id: "326",
    assignee: { email: "yolo.mccool@great.org" },
    name: params.ticket,
  };
  expect(task.next(newTicketMockData as any).value).toEqual(
    put(successPayloadAction(Type.AddDoneTicket, context, newTicketMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Daily done tickets creation task", () => {
  it("should create a done ticket", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
