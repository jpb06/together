import { TeamMember } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, successPayloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import teamMembersReducer from "./team.members.reducer";

describe("Team members reducer", () => {
  it("should initialize properly", () => {
    const reducer = teamMembersReducer(
      undefined,
      payloadAction("Init" as Type)
    );

    expect(reducer).toStrictEqual(initialState.teamMembers);
  });

  it("should initialize as an empty array at login", () => {
    const reducer = teamMembersReducer(
      undefined,
      successPayloadAction(Type.Login, Context.Global)
    );

    expect(reducer).toStrictEqual([]);
  });

  it("should set team members", () => {
    const teamMembersMockData: Array<TeamMember> = [
      {
        id: "23",
        lastName: "Bro",
        firstName: "Yolo",
        avatarName: "yolo.gif",
        email: "yolo@bro.com",
        status: "creator",
        joinDate: new Date().toISOString(),
      },
      {
        id: "1",
        lastName: "Coolman",
        firstName: "Joe",
        avatarName: "joe.gif",
        email: "joe@cool.com",
        status: "member",
        joinDate: new Date().toISOString(),
      },
    ];

    const reducer = teamMembersReducer(
      undefined,
      successPayloadAction(
        Type.TeamMembers,
        Context.Global,
        teamMembersMockData
      )
    );

    expect(reducer).toStrictEqual(teamMembersMockData);
  });
});
