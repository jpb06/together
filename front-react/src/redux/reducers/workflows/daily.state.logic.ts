import {
    ActionWithPayload, DailyState, DailyStepFeedback, ReduxActionType as Type
} from "../../../types/redux";
import {
    isFailedFor, isSagaFor, isSuccessFor
} from "../../identifiers/generic.actions.identifiers";

export const initDailyDurationStep = (
  isValidated: boolean = false,
  isPending: boolean = false
): DailyStepFeedback => {
  return {
    globalFeedback: {
      isValidated,
      isPending,
    },
  };
};

export enum DailyStepActionType {
  Add = 1 << 0,
  Delete = 1 << 1,
}
export const setDailyStep = (
  initialState: any = {},
  isValidated: boolean = false,
  isPending: boolean = false,
  action?: DailyStepActionType,
  isErrored: boolean = false,
  term: string = ""
): DailyStepFeedback => {
  const feedback: DailyStepFeedback = {
    ...initialState,
    globalFeedback: {
      isValidated,
      isPending,
    },
  };
  if (action) {
    if (DailyStepActionType.Add === (action & DailyStepActionType.Add)) {
      feedback.addActionFeedback = {
        isPending,
        isErrored,
        text: isPending ? "Adding ticket..." : "Add",
      };
    }
    if (DailyStepActionType.Delete === (action & DailyStepActionType.Delete)) {
      feedback.deleteActionFeedback = {
        isPending,
        term,
      };
    }
  }

  return feedback;
};

export const setDurationState = (
  action: ActionWithPayload<any>,
  initialState: DailyState
) => {
  if (isSagaFor(Type.DailyDuration, action.type)) {
    return {
      ...initialState,
      duration: initDailyDurationStep(false, true),
    };
  }

  if (isSuccessFor(Type.DailyDuration, action.type)) {
    return {
      ...initialState,
      duration: initDailyDurationStep(true, false),
    };
  }

  if (isFailedFor(Type.DailyDuration, action)) {
    return {
      ...initialState,
      duration: initDailyDurationStep(false, false),
    };
  }

  return undefined;
};

export const setDailyBlockState = (
  action: ActionWithPayload<any>,
  addType: Type,
  delType: Type,
  initialState: DailyState,
  subState: DailyStepFeedback,
  subStateName: "doneTickets" | "unforeseenTickets" | "subjects" | "feelings",
  key: string = ""
) => {
  const state: DailyState = {
    ...initialState,
  };

  if (isSagaFor(addType, action.type)) {
    state[subStateName] = setDailyStep(
      subState,
      false,
      true,
      DailyStepActionType.Add
    );
    return state;
  }
  if (isSagaFor(delType, action.type)) {
    state[subStateName] = setDailyStep(
      subState,
      false,
      true,
      DailyStepActionType.Delete,
      false,
      key
    );
    return state;
  }

  if (isSuccessFor(addType, action.type)) {
    state[subStateName] = setDailyStep(
      subState,
      true,
      false,
      DailyStepActionType.Add
    );
    return state;
  }
  if (isSuccessFor(delType, action.type)) {
    state[subStateName] = setDailyStep(
      subState,
      true,
      false,
      DailyStepActionType.Delete
    );
    return state;
  }

  if (isFailedFor(addType, action)) {
    state[subStateName] = setDailyStep(
      subState,
      false,
      false,
      DailyStepActionType.Add,
      true
    );
    return state;
  }
  if (isFailedFor(delType, action)) {
    state[subStateName] = setDailyStep(
      subState,
      false,
      false,
      DailyStepActionType.Delete,
      true
    );
    return state;
  }

  return undefined;
};
