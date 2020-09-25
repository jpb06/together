import { TeamWithLastActivity } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, successPayloadAction } from "../../actions";
import { InviteUserToTeamResult } from "../../tasks";
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

  it("should add an invited user to the relevant team", () => {
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
    const invite: InviteUserToTeamResult = {
      teamId: "23",
      user: {
        id: "60",
        firstName: "Cool",
        lastName: "Girl",
        avatarName: "cool.gif",
        email: "cool.girl@yolo.org",
      },
    };
    const reducer = userTeamsReducer(
      userTeamsMockData,
      successPayloadAction(Type.InviteUserToTeam, Context.Global, {
        id: "",
        date: new Date().toISOString(),
        invitee: invite.user,
        referrer: invite.user,
      })
    );

    expect(reducer).toStrictEqual({
      ...userTeamsMockData,
      invitedUsers: [invite.user],
    });
  });
});
