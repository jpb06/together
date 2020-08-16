import { delay, put, select } from "redux-saga/effects";

import { displaySnackbarTask } from "../";
import {
    ReduxActionContext as Context, ReduxActionType as Type, SnackbarKind
} from "../../../types/redux";
import { payloadAction } from "../../actions";
import { isSnackbarOpen } from "../../selectors";

describe("Snackbar task", () => {
  it("should display the snackbar if it is not open", () => {
    const params = {
      type: Type.Snackbar,
      payload: {
        type: SnackbarKind.Error,
        text: "Oh no!",
        isOpen: true,
      },
    };
    const task = displaySnackbarTask(params);

    expect(task.next().value).toEqual(select(isSnackbarOpen));

    expect(task.next(false).value).toEqual(
      put(payloadAction(Type.Snackbar, params.payload))
    );

    expect(task.next().done).toBe(true);
  });

  it("should close the snackbar after a delay and then display the new message, if snackbar is alreayd open", () => {
    const params = {
      type: Type.Snackbar,
      payload: {
        type: SnackbarKind.Error,
        text: "Oh no!",
        isOpen: true,
      },
    };
    const task = displaySnackbarTask(params);

    expect(task.next().value).toEqual(select(isSnackbarOpen));

    expect(task.next(true).value).toEqual(
      put(payloadAction(Type.ClearSnackbar))
    );
    expect(task.next().value).toEqual(delay(500));

    expect(task.next().value).toEqual(
      put(payloadAction(Type.Snackbar, params.payload))
    );

    expect(task.next().done).toBe(true);
  });
});
