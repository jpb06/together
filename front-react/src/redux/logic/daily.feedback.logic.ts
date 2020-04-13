import { DailyStepFeedback } from "../store/root.state";
import {
  DailyFeedbackType,
  DailyAlterationBeginPayload,
} from "../actions/begin.api.call.action";
import {
  ActionWithPayload,
  DailyIsolatedPayload,
} from "../actions/util/generic.actions";
import {
  BEGIN_API_CALL_DAILY,
  DAILY_FAILURE_ISOLATED,
  DAILY_SUCCESS_ISOLATED,
  isDailyIsolatedFeedback,
} from "../actions/util/action.types";
import Daily from "../../types/daily.type";

export function initDailyDurationStep(
  isValidated: boolean = false,
  isPending: boolean = false
): DailyStepFeedback {
  return {
    globalFeedback: {
      isValidated,
      isPending,
    },
  };
}

export function initDailyStep(
  isValidated: boolean = false,
  isPending: boolean = false
): DailyStepFeedback {
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
}

export function setDailyStep(
  action: ActionWithPayload<
    string,
    DailyFeedbackType | DailyAlterationBeginPayload
  >
): DailyStepFeedback {
  const isPending = action.type === BEGIN_API_CALL_DAILY;
  const isFailure = action.type === DAILY_FAILURE_ISOLATED;
  const isValidated = action.type === DAILY_SUCCESS_ISOLATED;

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
      isValidated,
      isPending,
    },
    addActionFeedback,
    deleteActionFeedback,
  };
}

export function getActionType(
  action: ActionWithPayload<
    string,
    DailyFeedbackType | DailyAlterationBeginPayload
  >,
  allowedFeedbackTypes: Array<DailyFeedbackType>
): DailyFeedbackType | undefined {
  if (
    action.type !== BEGIN_API_CALL_DAILY &&
    !isDailyIsolatedFeedback(action.type)
  )
    return undefined;

  let type: DailyFeedbackType = DailyFeedbackType.Unknown;
  if (action.type === BEGIN_API_CALL_DAILY) {
    const payload = action.payload as DailyAlterationBeginPayload;
    type = payload.type;
  } else {
    type = (action.payload as DailyIsolatedPayload).type;
  }
  if (!allowedFeedbackTypes.includes(type)) return undefined;

  return type;
}

export function asFeedbackAction(
  action: ActionWithPayload<
    string,
    Daily | DailyFeedbackType | DailyAlterationBeginPayload
  >
) {
  return action as ActionWithPayload<
    string,
    DailyFeedbackType | DailyAlterationBeginPayload
  >;
}
