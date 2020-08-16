jest.mock("redux-saga/effects");
jest.mock("../identifiers/generic.actions.identifiers");
jest.mock("../tasks/generic/execute.saga.task");

import { takeLatest } from "redux-saga/effects";
import { mocked } from "ts-jest/utils";

import { ReduxActionType } from "../../types/redux";
import { isActionSagaBelongingTo } from "../identifiers/generic.actions.identifiers";
import { executeSaga, getTimelineTask } from "../tasks";
import { safeTakeLatest } from "./safe.take.latest.helper";

describe("Safe take latest helper", () => {
  it("should yield a takeLastest", () => {
    const types = [ReduxActionType.GetTimeline];
    const helper = safeTakeLatest(types, getTimelineTask);

    helper.next();

    expect(mocked(takeLatest).mock.calls.length).toBe(1);
    expect(mocked(isActionSagaBelongingTo).mock.calls[0][0]).toStrictEqual(
      types
    );
    expect(mocked(executeSaga).mock.calls[0][0]).toEqual(getTimelineTask);

    expect(helper.next().done).toBe(true);
  });
});
