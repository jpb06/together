import { call, put } from "redux-saga/effects";

import { addFeelingTask, apiCallTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi from "../../../api/setup/together.api";
import { FeelingKind } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { successPayloadAction } from "../../actions";

const performTest = (context: Context) => {
  const params = {
    teamId: "500",
    date: new Date().toISOString(),
    feeling: {
      type: FeelingKind.DyingInside,
      comment: "Way uncool, bro",
    },
  };
  const task = addFeelingTask(params, context);

  expect(task.next().value).toEqual(
    call(
      apiCallTask,
      TogetherApi.Instance.post(ApiRoutes.DailyFeelingsAdd, params)
    )
  );

  const newFeelingMockData = {
    id: "326",
    type: params.feeling.type,
    comment: params.feeling.comment,
    creator: { email: "yolo.mccool@great.org" },
  };
  expect(task.next(newFeelingMockData as any).value).toEqual(
    put(successPayloadAction(Type.AddFeeling, context, newFeelingMockData))
  );

  expect(task.next().done).toBe(true);
};

describe("Daily feelings creation task", () => {
  it("should create a new feeling", () => {
    performTest(Context.Global);
  });

  it("should stick to the context provided", () => {
    performTest(Context.Onboarding);
  });
});
