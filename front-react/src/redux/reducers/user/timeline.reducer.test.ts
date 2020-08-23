import {
  ReduxActionContext as Context,
  ReduxActionType as Type,
} from "../../../types/redux";
import { TimeLine, TimeLineEntryKind } from "../../../types/shared";
import { payloadAction, successPayloadAction } from "../../actions";
import timelineReducer from "./timeline.reducer";

describe("Timeline reducer", () => {
  it("should initialize as null", () => {
    const reducer = timelineReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toBeNull();
  });

  it("should initialize as null at login", () => {
    const reducer = timelineReducer(
      undefined,
      successPayloadAction(Type.Login, Context.Global)
    );

    expect(reducer).toBeNull();
  });

  it("should set timeline", () => {
    const timelineMockData: TimeLine = {
      userEvents: [
        {
          type: TimeLineEntryKind.Daily,
          date: new Date().toISOString(),
          entry: {
            id: "543",
            date: new Date().toISOString(),
            team: { id: "23", name: "The cool team" },
          },
          shortTitle: "Stuff",
        },
      ],
      currentTeam: {
        events: [],
        id: "23",
        name: "The cool team",
      },
    };

    const reducer = timelineReducer(
      undefined,
      successPayloadAction(Type.GetTimeline, Context.Global, timelineMockData)
    );

    expect(reducer).toStrictEqual(timelineMockData);
  });
});
