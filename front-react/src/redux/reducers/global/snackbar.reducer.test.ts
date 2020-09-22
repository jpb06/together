import {
  ReduxActionType as Type,
  SnackbarData,
  SnackbarKind,
} from "../../../types/redux";
import { payloadAction } from "../../actions";
import { initialState } from "../../store/root.state";
import snackbarReducer from "./snackbar.reducer";

describe("Snackbar reducer", () => {
  const payload = {
    text: "Yolo",
    type: SnackbarKind.Success,
    isOpen: true,
    relatedAction: Type.TeamMembers,
  };

  it("should initialize properly", () => {
    const reducer = snackbarReducer(undefined, payloadAction("Init" as Type));

    expect(reducer).toStrictEqual(initialState.snackbar);
  });

  it("should change its state when action type is snackbar", () => {
    const reducer = snackbarReducer(
      undefined,
      payloadAction<SnackbarData>(Type.Snackbar, payload)
    );

    expect(reducer).toStrictEqual(payload);
  });

  it("should reset its state when receiving a clear snackbar action", () => {
    const reducer = snackbarReducer(payload, payloadAction(Type.ClearSnackbar));

    expect(reducer).toStrictEqual({
      ...payload,
      isOpen: false,
    });
  });
});
