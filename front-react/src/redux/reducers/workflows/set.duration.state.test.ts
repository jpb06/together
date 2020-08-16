import { ReduxActionContext as Context, ReduxActionType as Type } from "../../../types/redux";
import { sagaPayloadAction, showErrorAction, successPayloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import { setDurationState } from "./daily.state.logic";

describe("setDurationState", () => {
  it("should set duration step as pending", () => {
    const result = setDurationState(
      sagaPayloadAction(Type.DailyDuration, Context.Daily),
      initialState.dailyState
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      duration: {
        globalFeedback: {
          isValidated: false,
          isPending: true,
        },
      },
    });
  });

  it("should set duration step as validated", () => {
    const result = setDurationState(
      successPayloadAction(Type.DailyDuration, Context.Daily),
      initialState.dailyState
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      duration: {
        globalFeedback: {
          isValidated: true,
          isPending: false,
        },
      },
    });
  });

  it("should set duration step as not validated when failed", () => {
    const result = setDurationState(
      showErrorAction(Type.DailyDuration, Context.Daily, "Oh no!"),
      initialState.dailyState
    );

    expect(result).toStrictEqual({
      ...initialState.dailyState,
      duration: {
        globalFeedback: {
          isValidated: false,
          isPending: false,
        },
      },
    });
  });

  it("should return undefined if action if unrelated", () => {
    const result = setDurationState(
      sagaPayloadAction(Type.GetUserTeams, Context.Modal),
      initialState.dailyState
    );

    expect(result).toBe(undefined);
  });
});
