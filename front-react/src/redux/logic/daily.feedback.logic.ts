import {
  DailyFeedbackType,
  DailyAlterationBeginPayload,
} from "../actions/global/begin.api.call.action";
import Daily from "../../types/daily.type";
import { DailyStepFeedback } from "../types/daily.feedback.type";
import {
  ActionWithPayload,
  DailyIsolatedPayload,
} from "../types/action.payloads";
import { Context, Type, Result } from "../types/action.types";
import { check } from "./action-types/redux.action.type.validation";

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
  const isPending = check(action.type)
    .is(Type.beginApiCall)
    .for(Context.Daily)
    .truthy();
  const dailyCheck = check(action.type).is(Type.daily).for(Context.Daily);
  const isFailure = dailyCheck.as(Result.Failure).truthy();
  const isValidated = dailyCheck.as(Result.Success).truthy();

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
  const isBeginApiCall = check(action.type)
    .is(Type.beginApiCall)
    .for(Context.Daily)
    .truthy();
  const dailyCheck = check(action.type).is(Type.daily).for(Context.Daily);

  if (
    !isBeginApiCall &&
    !(
      dailyCheck.as(Result.Failure).truthy() ||
      dailyCheck.as(Result.Success).truthy()
    )
  )
    return undefined;

  let type: DailyFeedbackType = DailyFeedbackType.Unknown;
  if (isBeginApiCall) {
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
