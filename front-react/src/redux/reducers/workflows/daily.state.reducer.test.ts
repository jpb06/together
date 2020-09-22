import { Daily } from "../../../stack-shared-code/types";
import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { payloadAction, sagaPayloadAction, successPayloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import dailyStatusReducer from "./daily.state.reducer";

describe("Daily state reducer", () => {
  it("should initialize properly", () => {
    const reducer = dailyStatusReducer(
      undefined,
      payloadAction("Init" as Type)
    );

    expect(reducer).toStrictEqual(initialState.dailyState);
  });

  it("should update its state when daily is successfully fetched", () => {
    const daily: Daily = {
      id: "23",
      day: 1,
      month: 1,
      year: 1,
      teamId: "335",
      durationIndicator: "15",
      doneTickets: [],
      unforeseenTickets: [],
      subjects: [],
      feelings: [],
    };
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      successPayloadAction(Type.GetDaily, Context.Global, daily)
    );

    expect(reducer).toStrictEqual({
      ...initialState.dailyState,
      duration: {
        globalFeedback: {
          isValidated: true,
          isPending: false,
        },
      },
    });
  });

  it("should not alter state if action is not in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      successPayloadAction(Type.GetUserTeams, Context.Global)
    );

    expect(reducer).toStrictEqual(initialState.dailyState);
  });

  it("should alter state for a duration action in daily context", () => {
    const daily: Daily = {
      id: "23",
      day: 1,
      month: 1,
      year: 1,
      teamId: "335",
      durationIndicator: "15",
      doneTickets: [],
      unforeseenTickets: [],
      subjects: [],
      feelings: [],
    };
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.DailyDuration, Context.Daily)
    );

    expect(reducer).toStrictEqual({
      ...initialState.dailyState,
      duration: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
      },
    });
  });

  it("should alter state for a add done ticket action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.AddDoneTicket, Context.Daily, { ticket: "Yolo" })
    );

    expect(reducer).toStrictEqual({
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

  it("should alter state for a remove done ticket action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.RemoveDoneTicket, Context.Daily, {
        ticket: "Yolo",
      })
    );

    expect(reducer).toStrictEqual({
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

  it("should alter state for a add unforeseen ticket action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.AddUnforeseenTicket, Context.Daily, {
        ticket: "Yolo",
      })
    );

    expect(reducer).toStrictEqual({
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

  it("should alter state for a remove unforeseen ticket action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.RemoveUnforeseenTicket, Context.Daily, {
        ticket: "Yolo",
      })
    );

    expect(reducer).toStrictEqual({
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

  it("should alter state for a add feeling action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.AddFeeling, Context.Daily, {
        id: "1",
      })
    );

    expect(reducer).toStrictEqual({
      ...initialState.dailyState,
      feelings: {
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

  it("should alter state for a remove feeling action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.RemoveFeeling, Context.Daily, {
        id: "1",
      })
    );

    expect(reducer).toStrictEqual({
      ...initialState.dailyState,
      feelings: {
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
          term: "1",
        },
      },
    });
  });

  it("should alter state for a add subject action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.AddSubject, Context.Daily, {
        id: "1",
      })
    );

    expect(reducer).toStrictEqual({
      ...initialState.dailyState,
      subjects: {
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

  it("should alter state for a remove subject action in daily context", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.RemoveSubject, Context.Daily, {
        id: "1",
      })
    );

    expect(reducer).toStrictEqual({
      ...initialState.dailyState,
      subjects: {
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
          term: "1",
        },
      },
    });
  });

  it("should not alter state when action if unrelated (but in daily context somehow)", () => {
    const reducer = dailyStatusReducer(
      initialState.dailyState,
      sagaPayloadAction(Type.GetUserTeams, Context.Daily)
    );

    expect(reducer).toStrictEqual(initialState.dailyState);
  });
});
