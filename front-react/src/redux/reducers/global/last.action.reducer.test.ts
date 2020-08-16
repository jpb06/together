import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../../types/redux";
import {
    payloadAction, sagaPayloadAction, showErrorAction, successPayloadAction
} from "../../actions";
import lastActionReducer from "./last.action.reducer";

describe("Recent actions reducer", () => {
  it("should initialize as null", () => {
    const reducer = lastActionReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toBeNull;
  });

  it("should return null when passed an action that doesn't match its logic", () => {
    const reducer = lastActionReducer(null, payloadAction("Init" as Type));

    expect(reducer).toBeNull;
  });

  it("should return null if passed a ClearLastAction action", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [
          { type: Type.CreateTeam, hasSucceeded: true },
          { type: Type.CreateUser },
        ],
      },
      payloadAction(Type.ClearLastAction)
    );

    expect(reducer).toBeNull;
  });

  it("should update a task when it succeeded", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [
          { type: Type.CreateTeam },
          { type: Type.CreateUser, hasSucceeded: true },
          { type: Type.GetUserTeams, hasSucceeded: false },
          { type: Type.TeamMembers },
        ],
      },
      successPayloadAction(Type.CreateTeam, Context.Global)
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [
        { type: Type.CreateTeam, hasSucceeded: true },
        { type: Type.CreateUser, hasSucceeded: true },
        { type: Type.GetUserTeams, hasSucceeded: false },
        { type: Type.TeamMembers },
      ],
    });
  });

  it("should return null if there is no recent action", () => {
    const reducer = lastActionReducer(
      null,
      successPayloadAction(Type.GetUserTeams, Context.Global)
    );

    expect(reducer).toBeNull;
  });

  it("should return null if context changed", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [{ type: Type.CreateTeam }],
      },
      successPayloadAction(Type.GetUserTeams, Context.Daily)
    );

    expect(reducer).toBeNull;
  });

  it("should update a task when it failed", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [
          { type: Type.CreateTeam },
          { type: Type.CreateUser, hasSucceeded: true },
          { type: Type.GetUserTeams, hasSucceeded: false },
          { type: Type.TeamMembers },
        ],
      },
      showErrorAction(Type.TeamMembers, Context.Global, "Error")
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [
        { type: Type.CreateTeam },
        { type: Type.CreateUser, hasSucceeded: true },
        { type: Type.GetUserTeams, hasSucceeded: false },
        { type: Type.TeamMembers, hasSucceeded: false },
      ],
    });
  });

  it("should not update a succeeded task", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [{ type: Type.CreateTeam, hasSucceeded: false }],
      },
      successPayloadAction(Type.CreateTeam, Context.Global)
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [{ type: Type.CreateTeam, hasSucceeded: false }],
    });
  });

  it("should not update a failed task", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [{ type: Type.CreateTeam, hasSucceeded: true }],
      },
      showErrorAction(Type.CreateTeam, Context.Global, "Error")
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [{ type: Type.CreateTeam, hasSucceeded: true }],
    });
  });

  it("should add a new pending action", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [
          { type: Type.CreateTeam },
          { type: Type.CreateUser, hasSucceeded: true },
          { type: Type.GetUserTeams, hasSucceeded: false },
          { type: Type.TeamMembers },
        ],
      },
      sagaPayloadAction(Type.RemoveDoneTicket, Context.Global)
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [{ type: Type.RemoveDoneTicket, hasSucceeded: undefined }],
    });
  });

  it("should ignore actions without context", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [{ type: Type.CreateTeam }],
      },
      { type: `${Type.CreateTeam}_${Modifier.Saga}_YOLO`, payload: undefined }
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [{ type: Type.CreateTeam }],
    });
  });

  it("should add new pending combined actions", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [
          { type: Type.CreateTeam },
          { type: Type.CreateUser, hasSucceeded: true },
          { type: Type.GetUserTeams, hasSucceeded: false },
          { type: Type.TeamMembers },
        ],
      },
      sagaPayloadAction(
        [Type.RemoveDoneTicket, Type.RemoveUnforeseenTicket],
        Context.Global
      )
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [
        { type: Type.RemoveDoneTicket, hasSucceeded: undefined },
        { type: Type.RemoveUnforeseenTicket, hasSucceeded: undefined },
      ],
    });
  });

  it("should update a pending combined action that failed", () => {
    const reducer = lastActionReducer(
      {
        context: Context.Global,
        tasks: [
          { type: Type.RemoveDoneTicket, hasSucceeded: true },
          { type: Type.RemoveUnforeseenTicket, hasSucceeded: undefined },
        ],
      },
      showErrorAction(
        [Type.RemoveDoneTicket, Type.RemoveUnforeseenTicket].join("|"),
        Context.Global,
        "Error"
      )
    );

    expect(reducer).toStrictEqual({
      context: Context.Global,
      tasks: [
        { type: Type.RemoveDoneTicket, hasSucceeded: false },
        { type: Type.RemoveUnforeseenTicket, hasSucceeded: false },
      ],
    });
  });
});
