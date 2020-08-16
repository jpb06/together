import { call } from "redux-saga/effects";

import { DetailsRemovalType, removeDetailsSubtask, removeDetailsTask } from "../";
import { ApiRoutes } from "../../../api/api.routes.enum";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";

const performTest = (detailsType: DetailsRemovalType, context: Context) => {
  const params = {
    id: "74",
    teamId: "500",
    date: new Date().toISOString(),
    detailsType,
  };
  const task = removeDetailsTask(params, context);

  switch (params.detailsType) {
    case DetailsRemovalType.Feelings:
      expect(task.next().value).toEqual(
        call(
          removeDetailsSubtask,
          params,
          ApiRoutes.DailyFeelingsRemove,
          Type.RemoveFeeling,
          context
        )
      );
      break;
    case DetailsRemovalType.Subjects:
      expect(task.next().value).toEqual(
        call(
          removeDetailsSubtask,
          params,
          ApiRoutes.DailySubjectsRemove,
          Type.RemoveSubject,
          context
        )
      );
      break;
  }

  expect(task.next().done).toBe(true);
};

describe("Daily details deletion task", () => {
  it("should remove a feeling", () => {
    performTest(DetailsRemovalType.Feelings, Context.Global);
  });

  it("should remove a subject", () => {
    performTest(DetailsRemovalType.Subjects, Context.Onboarding);
  });
});
