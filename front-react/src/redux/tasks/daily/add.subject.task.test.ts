import { call, put } from "redux-saga/effects";

import { addSubjectTask, apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { SubjectKind } from "../../../types/shared";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = {
    teamId: "500",
    date: new Date().toISOString(),
    subject: {
      type: SubjectKind.Goal,
      description: "100% code coverage on sagas!",
    },
  };
  const task = addSubjectTask(params, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.DailySubjectsAdd, params)
    )
  );

  const newSubjectMockData = {
    id: "326",
    type: params.subject.type,
    description: params.subject.description,
    creator: { email: "yolo.mccool@great.org" },
  };
  expect(task.next(newSubjectMockData as any).value).toEqual(
    put(successPayloadAction(Type.AddSubject, context, newSubjectMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Daily subjects creation task", () => {
  it("should create a new subject", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
