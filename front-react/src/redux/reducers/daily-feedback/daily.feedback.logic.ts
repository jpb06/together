import {
    ActionWithPayload, DailyAlterationBeginPayload, DailyFeedbackType, DailyIsolatedPayload,
    DailyStepFeedback
} from "../../../types/redux";
import { Daily } from "../../../types/shared";
import {
    isFailedDailyAction, isPendingDailyAction, isSucceededDailyAction
} from "../../identifiers/daily.actions.identifiers";

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

export const initDailyStep = (
  isValidated: boolean = false,
  isPending: boolean = false
): DailyStepFeedback => {
  return {
    globalFeedback: {
      isValidated,
      isPending,
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
  };
};

export const setDailyStep = (
  action: ActionWithPayload<DailyFeedbackType | DailyAlterationBeginPayload>
): DailyStepFeedback => {
  const isPending = isPendingDailyAction(action);
  const isFailure = isFailedDailyAction(action);
  const isSucceeded = isSucceededDailyAction(action);

  let feedbackType = DailyFeedbackType.Unknown;
  let ticketKey = "";

  if (isPending) {
    const payload = action.payload as DailyAlterationBeginPayload;
    feedbackType = payload.type;
    ticketKey = payload.term as string;
  } else {
    feedbackType = action.payload as DailyFeedbackType;
  }

  const addActionFeedback = {
    isPending: false,
    isErrored: false,
    text: "Add",
  };
  if (
    feedbackType === DailyFeedbackType.AddUnforeseenTicket ||
    feedbackType === DailyFeedbackType.AddDoneTicket ||
    feedbackType === DailyFeedbackType.AddFeeling ||
    feedbackType === DailyFeedbackType.AddSubject
  ) {
    addActionFeedback.isPending = isPending;
    addActionFeedback.isErrored = isFailure;
    addActionFeedback.text = isPending ? "Adding ticket..." : "Add";
  }

  const deleteActionFeedback = {
    isPending: false,
    term: "",
  };
  if (
    feedbackType === DailyFeedbackType.RemoveUnforeseenTicket ||
    feedbackType === DailyFeedbackType.RemoveDoneTicket ||
    feedbackType === DailyFeedbackType.RemoveFeeling ||
    feedbackType === DailyFeedbackType.RemoveSubject
  ) {
    deleteActionFeedback.isPending = isPending;
    deleteActionFeedback.term = ticketKey;
  }

  return {
    globalFeedback: {
      isValidated: isSucceeded,
      isPending,
    },
    addActionFeedback,
    deleteActionFeedback,
  };
};

export const getFeedbackTypeFor = (
  action: ActionWithPayload<DailyFeedbackType | DailyAlterationBeginPayload>,
  allowedFeedbackTypes: Array<DailyFeedbackType>
): DailyFeedbackType | undefined => {
  const isPending = isPendingDailyAction(action);

  if (
    !isPending &&
    !(isSucceededDailyAction(action) || isFailedDailyAction(action))
  )
    return undefined;

  let type: DailyFeedbackType = DailyFeedbackType.Unknown;
  if (isPending) {
    const payload = action.payload as DailyAlterationBeginPayload;
    type = payload.type;
  } else {
    type = (action.payload as DailyIsolatedPayload<any>).type;
  }
  if (!allowedFeedbackTypes.includes(type)) return undefined;

  return type;
};

export const asFeedbackAction = (
  action: ActionWithPayload<
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) =>
  action as ActionWithPayload<DailyFeedbackType | DailyAlterationBeginPayload>;
