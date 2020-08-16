import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { LoggedUser, TeamJoinRequest, TeamWithLastActivity } from "../../../types/shared";
import { payloadAction, successPayloadAction } from "../../actions";
import userTeamsReducer from "./user.teams.reducer";

describe("User teams reducer", () => {
  it("should initialize as an empty array", () => {
    const reducer = userTeamsReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toStrictEqual([]);
  });

  it("should initialize as an empty array at login", () => {
    const reducer = userTeamsReducer(
      undefined,
      successPayloadAction(Type.Login, Context.Global)
    );

    expect(reducer).toStrictEqual([]);
  });

  it("should initialize user teams", () => {
    const userTeamsMockData: Array<TeamWithLastActivity> = [
      {
        id: "23",
        name: "Yolo",
        members: [],
        joinRequests: [],
        invitedUsers: [],
        lastActivity: "",
      },
    ];
    const reducer = userTeamsReducer(
      undefined,
      successPayloadAction(Type.GetUserTeams, Context.Global, userTeamsMockData)
    );

    expect(reducer).toStrictEqual(userTeamsMockData);
  });
});
