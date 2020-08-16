import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { Daily, FeelingKind, SubjectKind } from "../../../types/shared";
import { payloadAction, successPayloadAction } from "../../actions";
import dailyReducer from "./daily.reducer";

describe("Daily reducer", () => {
  const dailyMockData: Daily = {
    id: "yolo",
    teamId: "bro",
    day: 1,
    month: 2,
    year: 2000,
    durationIndicator: "15mins",
    doneTickets: [],
    unforeseenTickets: [],
    feelings: [],
    subjects: [],
  };

  it("should initialize as null", () => {
    const reducer = dailyReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toBeNull;
  });

  it("should store daily", () => {
    const reducer = dailyReducer(
      undefined,
      successPayloadAction(Type.GetDaily, Context.Global, dailyMockData)
    );

    expect(reducer).toStrictEqual(dailyMockData);
  });

  it("shouldn't update its state if the action is not in Daily context", () => {
    const reducer = dailyReducer(
      dailyMockData,
      successPayloadAction(Type.DailyDuration, Context.Global, {
        ...dailyMockData,
        id: "newDaily",
      })
    );

    expect(reducer).toStrictEqual(dailyMockData);
  });

  it("should update daily duration", () => {
    const durationIndicator = "30 mins";

    const reducer = dailyReducer(
      dailyMockData,
      successPayloadAction(Type.DailyDuration, Context.Daily, durationIndicator)
    );

    expect(reducer).toStrictEqual({ ...dailyMockData, durationIndicator });
  });

  it("should add a new done ticket", () => {
    const initialState: Daily = {
      ...dailyMockData,
      doneTickets: [
        {
          id: "1",
          name: "WEB-1",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
        {
          id: "2",
          name: "WEB-2",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
      ],
    };
    const newTicket = {
      id: "3",
      name: "WEB-3",
      creator: {
        id: "23",
        lastName: "Bro",
        firstName: "Yolo",
        avatarName: "yolo.gif",
        email: "yolo@bro.com",
      },
    };
    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.AddDoneTicket, Context.Daily, newTicket)
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      doneTickets: [...initialState.doneTickets, newTicket],
    });
  });

  it("should delete a done ticket", () => {
    const initialState: Daily = {
      ...dailyMockData,
      doneTickets: [
        {
          id: "1",
          name: "WEB-1",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
        {
          id: "2",
          name: "WEB-2",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
      ],
    };

    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.RemoveDoneTicket, Context.Daily, "WEB-2")
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      doneTickets: [initialState.doneTickets[0]],
    });
  });

  it("should add a new unforeseen ticket", () => {
    const initialState: Daily = {
      ...dailyMockData,
      unforeseenTickets: [
        {
          id: "1",
          name: "WEB-1",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
        {
          id: "2",
          name: "WEB-2",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
      ],
    };
    const newTicket = {
      id: "3",
      name: "WEB-3",
      creator: {
        id: "23",
        lastName: "Bro",
        firstName: "Yolo",
        avatarName: "yolo.gif",
        email: "yolo@bro.com",
      },
    };
    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.AddUnforeseenTicket, Context.Daily, newTicket)
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      unforeseenTickets: [...initialState.unforeseenTickets, newTicket],
    });
  });

  it("should delete an unforeseen ticket", () => {
    const initialState: Daily = {
      ...dailyMockData,
      unforeseenTickets: [
        {
          id: "1",
          name: "WEB-1",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
        {
          id: "2",
          name: "WEB-2",
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
        },
      ],
    };

    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.RemoveUnforeseenTicket, Context.Daily, "WEB-1")
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      unforeseenTickets: [initialState.unforeseenTickets[1]],
    });
  });

  it("should add a new feeling", () => {
    const initialState: Daily = {
      ...dailyMockData,
      feelings: [
        {
          id: "1",
          type: FeelingKind.DyingInside,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          comment: "Yolo bro",
        },
        {
          id: "2",
          type: FeelingKind.ThumbsUp,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          comment: "Cool and good but also great",
        },
      ],
    };
    const newFeeling = {
      id: "3",
      type: FeelingKind.Satisfaction,
      creator: {
        id: "23",
        lastName: "Bro",
        firstName: "Yolo",
        avatarName: "yolo.gif",
        email: "yolo@bro.com",
      },
      comment: "I'm happy",
    };
    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.AddFeeling, Context.Daily, newFeeling)
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      feelings: [...initialState.feelings, newFeeling],
    });
  });

  it("should delete a feeling", () => {
    const initialState: Daily = {
      ...dailyMockData,
      feelings: [
        {
          id: "1",
          type: FeelingKind.DyingInside,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          comment: "Yolo bro",
        },
        {
          id: "2",
          type: FeelingKind.ThumbsUp,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          comment: "Cool and good but also great",
        },
      ],
    };

    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.RemoveFeeling, Context.Daily, "2")
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      feelings: [initialState.feelings[0]],
    });
  });

  it("should add a new subject", () => {
    const initialState: Daily = {
      ...dailyMockData,
      subjects: [
        {
          id: "1",
          type: SubjectKind.Drive,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          description: "Yolo bro",
        },
        {
          id: "2",
          type: SubjectKind.Risk,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          description: "Oh no!",
        },
      ],
    };
    const newSubject = {
      id: "3",
      type: SubjectKind.Team,
      creator: {
        id: "23",
        lastName: "Bro",
        firstName: "Yolo",
        avatarName: "yolo.gif",
        email: "yolo@bro.com",
      },
      comment: "Great team",
    };
    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.AddSubject, Context.Daily, newSubject)
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      subjects: [...initialState.subjects, newSubject],
    });
  });

  it("should delete a subject", () => {
    const initialState: Daily = {
      ...dailyMockData,
      subjects: [
        {
          id: "1",
          type: SubjectKind.Drive,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          description: "Yolo bro",
        },
        {
          id: "2",
          type: SubjectKind.Risk,
          creator: {
            id: "23",
            lastName: "Bro",
            firstName: "Yolo",
            avatarName: "yolo.gif",
            email: "yolo@bro.com",
          },
          description: "Oh no!",
        },
      ],
    };

    const reducer = dailyReducer(
      initialState,
      successPayloadAction(Type.RemoveSubject, Context.Daily, "1")
    );

    expect(reducer).toStrictEqual({
      ...initialState,
      subjects: [initialState.subjects[1]],
    });
  });

  it("shouldn't update its state if the action is in daily context and is successful, but isn't a daily alteration action", () => {
    const reducer = dailyReducer(
      dailyMockData,
      successPayloadAction(Type.GetTimeline, Context.Daily, {
        ...dailyMockData,
        id: "newDaily",
      })
    );

    expect(reducer).toStrictEqual(dailyMockData);
  });
});
