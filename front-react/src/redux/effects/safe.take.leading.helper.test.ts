jest.mock("redux-saga/effects");
jest.mock("../identifiers/generic.actions.identifiers");
jest.mock("../tasks/generic/execute.saga.task");

import { takeLeading } from "redux-saga/effects";
import { mocked } from "ts-jest/utils";

import { ReduxActionType as Type } from "../../types/redux";
import { getDailyAndTeamMembersAction } from "../actions";
import {
    isActionSagaBelongingTo, isActionSagaFor
} from "../identifiers/generic.actions.identifiers";
import { executeSaga, getDailyTask, getTimelineTask } from "../tasks";
import { safeTakeLeading, safeTakeLeadingFor } from "./safe.take.leading.helper";

describe("safeTakeLeadingFor helper", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should yield a takeLeading when passed one action type", () => {
    const types = [Type.GetTimeline];
    const helper = safeTakeLeadingFor(types, getTimelineTask);
    helper.next();

    expect(mocked(takeLeading).mock.calls.length).toBe(1);
    expect(mocked(isActionSagaBelongingTo).mock.calls[0][0]).toStrictEqual(
      types
    );
    expect(mocked(executeSaga).mock.calls[0][0]).toEqual(getTimelineTask);

    expect(helper.next().done).toBe(true);
  });

  it("should yield a takeLeading when passed several action types", () => {
    const types = [Type.GetDaily, Type.TeamMembers];

    const helper = safeTakeLeadingFor(types, getDailyAndTeamMembersAction);
    helper.next();

    expect(mocked(takeLeading).mock.calls.length).toBe(1);
    expect(mocked(isActionSagaBelongingTo).mock.calls[0][0]).toStrictEqual(
      types
    );
    expect(mocked(executeSaga).mock.calls[0][0]).toEqual(
      getDailyAndTeamMembersAction
    );

    expect(helper.next().done).toBe(true);
  });
});

describe("safeTakeLeading", () => {
  it("should yield a takeLeading", () => {
    const type = "Yolo";

    const helper = safeTakeLeading(type, getDailyTask);
    helper.next();

    expect(mocked(takeLeading).mock.calls.length).toBe(1);
    expect(mocked(isActionSagaFor).mock.calls[0][0]).toEqual(type);
    expect(mocked(executeSaga).mock.calls[0][0]).toEqual(getDailyTask);

    expect(helper.next().done).toBe(true);
  });
});
