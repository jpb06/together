import { call, put } from "redux-saga/effects";

import { executeSaga, getTimelineTask } from "../";
import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../../types/redux";
import { sagaPayloadAction, showErrorAction, showSnackbarAction } from "../../actions";
import { extractActionTypeParts } from "../../identifiers/actions.reverse.mapping.identifiers";

describe("execute saga helper", () => {
  const context = Context.Global;
  const action = {
    type: Type.GetTimeline,
    payload: "3432",
  };

  it("should dispatch a snackbar action if an error occured while getting action parts", () => {
    const task = executeSaga(getTimelineTask)(action);

    const errorMessage = "Oh no!";
    expect(task.next().value).toEqual(call(extractActionTypeParts, action));
    expect(task.throw({ message: errorMessage }).value).toEqual(
      put(showSnackbarAction(errorMessage))
    );
    expect(task.next().done).toBe(true);
  });

  it("should dispatch a snackbar action if action parts could not be gathered", () => {
    const task = executeSaga(getTimelineTask)(action);

    const errorMessage = "Unable to extract action type parts";
    expect(task.next().value).toEqual(call(extractActionTypeParts, action));
    expect(task.next(undefined).value).toEqual(
      put(showSnackbarAction(errorMessage))
    );
    expect(task.next().done).toBe(true);
  });

  it("should display a snackbar if task failed to complete", () => {
    const task = executeSaga(getTimelineTask)(action);

    expect(task.next().value).toEqual(call(extractActionTypeParts, action));
    expect(
      task.next({ types: [action.type], context, modifier: Modifier.Saga })
        .value
    ).toEqual(call(getTimelineTask, action.payload, context));
    const errorMessage = "Oh no!";
    expect(task.throw({ message: errorMessage }).value).toEqual(
      put(showErrorAction(action.type, context, errorMessage))
    );
    expect(task.next().done).toBe(true);
  });

  it("should execute the task", () => {
    const task = executeSaga(getTimelineTask)(action);

    expect(task.next().value).toEqual(call(extractActionTypeParts, action));
    expect(
      task.next({ types: [action.type], context, modifier: Modifier.Saga })
        .value
    ).toEqual(call(getTimelineTask, action.payload, context));

    expect(task.next().done).toBe(true);
  });

  it("should execute a combined the task", () => {
    const sagaAction = sagaPayloadAction(
      [Type.GetTimeline, Type.GetDaily],
      Context.Global,
      "Yolo"
    );
    const task = executeSaga(getTimelineTask)(
      sagaAction as { type: string; payload: string }
    );

    expect(task.next().value).toEqual(call(extractActionTypeParts, sagaAction));
    expect(
      task.next({
        types: [Type.GetTimeline, Type.GetDaily],
        context,
        modifier: Modifier.Saga,
      }).value
    ).toEqual(call(getTimelineTask, sagaAction.payload as string, context));

    expect(task.next().done).toBe(true);
  });
});
