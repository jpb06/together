import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { sagaPayloadAction, showErrorAction, successPayloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import { setDailyBlockState } from "./daily.state.logic";

describe("setDailyBlockState", () => {
  it("should set state for done tickets when adding a ticket", () => {
    const result = setDailyBlockState(
      sagaPayloadAction(Type.AddDoneTicket, Context.Daily),
      Type.AddDoneTicket,
      Type.RemoveDoneTicket,
      initialState.dailyState,
      initialState.dailyState.doneTickets,
      "doneTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      doneTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
        addActionFeedback: {
          isPending: true,
          isErrored: false,
          text: "Adding ticket...",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should set state for done tickets when removing a ticket", () => {
    const result = setDailyBlockState(
      sagaPayloadAction(Type.RemoveDoneTicket, Context.Daily),
      Type.AddDoneTicket,
      Type.RemoveDoneTicket,
      initialState.dailyState,
      initialState.dailyState.doneTickets,
      "doneTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      doneTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: true,
          term: "Yolo",
        },
      },
    });
  });

  it("should set state for done tickets when removing a ticket, but without key", () => {
    const result = setDailyBlockState(
      sagaPayloadAction(Type.RemoveDoneTicket, Context.Daily),
      Type.AddDoneTicket,
      Type.RemoveDoneTicket,
      initialState.dailyState,
      initialState.dailyState.doneTickets,
      "doneTickets"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      doneTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: true,
          term: "",
        },
      },
    });
  });

  it("should set state for done tickets when succesfully adding a ticket", () => {
    const result = setDailyBlockState(
      successPayloadAction(Type.AddDoneTicket, Context.Daily),
      Type.AddDoneTicket,
      Type.RemoveDoneTicket,
      initialState.dailyState,
      initialState.dailyState.doneTickets,
      "doneTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      doneTickets: {
        globalFeedback: {
          isValidated: true,
          isPending: false,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should set state for done tickets when succesfully removing a ticket", () => {
    const result = setDailyBlockState(
      successPayloadAction(Type.RemoveDoneTicket, Context.Daily),
      Type.AddDoneTicket,
      Type.RemoveDoneTicket,
      initialState.dailyState,
      initialState.dailyState.doneTickets,
      "doneTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      doneTickets: {
        globalFeedback: {
          isValidated: true,
          isPending: false,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should set state for unforeseen tickets when adding a ticket", () => {
    const result = setDailyBlockState(
      sagaPayloadAction(Type.AddUnforeseenTicket, Context.Daily),
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      initialState.dailyState,
      initialState.dailyState.unforeseenTickets,
      "unforeseenTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      unforeseenTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
        addActionFeedback: {
          isPending: true,
          isErrored: false,
          text: "Adding ticket...",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should set state for unforeseen tickets when removing a ticket", () => {
    const result = setDailyBlockState(
      sagaPayloadAction(Type.RemoveUnforeseenTicket, Context.Daily),
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      initialState.dailyState,
      initialState.dailyState.unforeseenTickets,
      "unforeseenTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      unforeseenTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: true,
          term: "Yolo",
        },
      },
    });
  });

  it("should set state for unforeseen tickets when succesfully adding a ticket", () => {
    const result = setDailyBlockState(
      successPayloadAction(Type.AddUnforeseenTicket, Context.Daily),
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      initialState.dailyState,
      initialState.dailyState.unforeseenTickets,
      "unforeseenTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      unforeseenTickets: {
        globalFeedback: {
          isValidated: true,
          isPending: false,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should set state for unforeseen tickets when failing to adding a ticket", () => {
    const result = setDailyBlockState(
      showErrorAction(Type.AddUnforeseenTicket, Context.Daily, "Oh no!"),
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      initialState.dailyState,
      initialState.dailyState.unforeseenTickets,
      "unforeseenTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      unforeseenTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: false,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: true,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should set state for unforeseen tickets when failing to remove a ticket", () => {
    const result = setDailyBlockState(
      showErrorAction(Type.RemoveUnforeseenTicket, Context.Daily, "Oh no!"),
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      initialState.dailyState,
      initialState.dailyState.unforeseenTickets,
      "unforeseenTickets",
      "Yolo"
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      unforeseenTickets: {
        globalFeedback: {
          isValidated: false,
          isPending: false,
        },
        addActionFeedback: {
          isPending: false,
          isErrored: false,
          text: "Add",
        },
        deleteActionFeedback: {
          isPending: false,
          term: "",
        },
      },
    });
  });

  it("should return undefined if action is unrelated", () => {
    const result = setDailyBlockState(
      sagaPayloadAction(Type.CreateTeam, Context.Onboarding),
      Type.AddUnforeseenTicket,
      Type.RemoveUnforeseenTicket,
      initialState.dailyState,
      initialState.dailyState.unforeseenTickets,
      "unforeseenTickets"
    );

    expect(result).toBe(undefined);
  });
});
