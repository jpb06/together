import { call } from "redux-saga/effects";

import { ApiRoutes } from "../../../api/api.routes.enum";
import TogetherApi, { send } from "../../../api/setup/together.api";
import { apiCallTask } from "./api.call.task";

describe("Api call generic task", () => {
  it("should throw an error if the request failed", () => {
    const apiCall = TogetherApi.Instance.post(ApiRoutes.UserRequestToJoinTeam, {
      teamName: "The cool team",
    });
    const task = apiCallTask(apiCall);

    expect(task.next().value).toEqual(call(send, apiCall));

    try {
      task.next({
        success: false,
        error: "Not logged in",
      } as any);
    } catch (error) {
      expect(error.message).toEqual("Not logged in");
    }

    expect(task.next().done).toBe(true);
  });

  it("should return the response data if the call succeeds", () => {
    const apiCall = TogetherApi.Instance.post(ApiRoutes.UserRequestToJoinTeam, {
      teamName: "The cool team",
    });
    const task = apiCallTask(apiCall);

    expect(task.next().value).toEqual(call(send, apiCall));

    const apiResponse = {
      success: true,
      payload: {
        id: "23",
        date: "now",
        team: { id: "98", name: "My cool team" },
      },
    };
    const last = task.next(apiResponse as any);
    expect(last.value).toEqual(apiResponse.payload);

    expect(task.next().done).toBe(true);
  });
});
