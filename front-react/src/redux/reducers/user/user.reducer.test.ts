import { LoggedUser, TeamJoinRequest } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, successPayloadAction } from "../../actions";
import userReducer from "./user.reducer";

describe("User reducer", () => {
  const userMockedData: LoggedUser = {
    id: "23",
    lastName: "Bro",
    firstName: "Yolo",
    avatarName: "yolo.gif",
    email: "yolo@bro.com",
    teams: [],
    teamInvites: [],
    teamJoinRequests: [],
  };

  it("should initialize as null", () => {
    const reducer = userReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toBeNull();
  });

  it("should initialize properly at login", () => {
    const reducer = userReducer(
      undefined,
      successPayloadAction(Type.Login, Context.Global, userMockedData)
    );

    expect(reducer).toStrictEqual(userMockedData);
  });

  it("should do nothing if user has no state, when creating a team", () => {
    const newTeam = { id: "45", team: "That team" };
    const reducer = userReducer(
      null,
      successPayloadAction(Type.CreateTeam, Context.Global, newTeam)
    );

    expect(reducer).toBeNull();
  });

  it("should update user state when creating a team", () => {
    const userState = {
      ...userMockedData,
      fullName: "Yolo Bro",
      initials: "YB",
    };
    const newTeam = { id: "45", team: "That team" };
    const reducer = userReducer(
      userState,
      successPayloadAction(Type.CreateTeam, Context.Global, newTeam)
    );

    expect(reducer).toStrictEqual({ ...userState, teams: [newTeam] });
  });

  it("should do nothing if user has no state, when requesting to join a team", () => {
    const joinRequest: TeamJoinRequest = {
      id: "tau",
      date: new Date().toISOString(),
      team: { id: "45", name: "That team" },
    };
    const reducer = userReducer(
      null,
      successPayloadAction(Type.RequestToJoinTeam, Context.Global, joinRequest)
    );

    expect(reducer).toBeNull();
  });

  it("should update user state when requesting to join a team", () => {
    const userState = {
      ...userMockedData,
      fullName: "Yolo Bro",
      initials: "YB",
    };
    const joinRequest: TeamJoinRequest = {
      id: "tau",
      date: new Date().toISOString(),
      team: { id: "45", name: "That team" },
    };
    const reducer = userReducer(
      userState,
      successPayloadAction(Type.RequestToJoinTeam, Context.Global, joinRequest)
    );

    expect(reducer).toStrictEqual({
      ...userState,
      teamJoinRequests: [joinRequest],
    });
  });
});
