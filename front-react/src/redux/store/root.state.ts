import { initializeUserFromLocalStorage } from "../../logic/user.util";
import {
    AccountCreationState, AccountCreationStep, DailyState, SnackbarData, SnackbarKind
} from "../../types/redux";
import { RecentAction } from "../../types/redux/recent.action.interface";
import {
    AnswerTeamInviteModalState, AnswerTeamInviteModalSteps
} from "../../types/redux/workflows/answer.team.invite.modal.state.interface";
import { LoginState } from "../../types/redux/workflows/login.state.interface";
import { Daily, TimeLine, User } from "../../types/shared";
import { TeamMember, TeamWithLastActivity } from "../../types/shared";
import { DailyStepActionType, setDailyStep } from "../reducers/workflows/daily.state.logic";

export interface RootState {
  // Global
  readonly snackbar: SnackbarData;
  readonly lastAction: RecentAction | null;

  // User
  readonly user: User | null;
  readonly userTeams: Array<TeamWithLastActivity>;
  readonly timeline: TimeLine | null;
  readonly teamMembers: Array<TeamMember>;
  readonly daily: Daily | null;

  // workflows
  readonly loginState: LoginState;
  readonly accountCreationState: AccountCreationState;
  readonly answerTeamInviteModalState: AnswerTeamInviteModalState;
  readonly dailyState: DailyState;
}

const initialState: RootState = {
  // global
  snackbar: {
    isOpen: false,
    type: SnackbarKind.Error,
    text: "",
  },
  lastAction: null,
  // user
  user: initializeUserFromLocalStorage(),
  userTeams: [],
  timeline: null,
  teamMembers: [],
  daily: null,
  // login
  loginState: {
    isPending: false,
    isErrored: false,
    isSubmitted: false,
    actionText: "Login",
  },
  // account creation
  accountCreationState: {
    step: AccountCreationStep.User,
    isLoading: false,
    isErrored: false,
    isSubmitted: false,
    actionButtonText: "Choose my avatar",
    exitActionText: "No thanks, bring me to my timeline!",
    newTeamMembers: [],
  },
  // Answer team invite modal
  answerTeamInviteModalState: {
    step: AnswerTeamInviteModalSteps.Question,
    isModalOpen: false,
  },
  // Daily
  dailyState: {
    duration: setDailyStep(),
    unforeseenTickets: setDailyStep(
      {},
      false,
      false,
      DailyStepActionType.Add | DailyStepActionType.Delete
    ),
    doneTickets: setDailyStep(
      {},
      false,
      false,
      DailyStepActionType.Add | DailyStepActionType.Delete
    ),
    subjects: setDailyStep(
      {},
      false,
      false,
      DailyStepActionType.Add | DailyStepActionType.Delete
    ),
    feelings: setDailyStep(
      {},
      false,
      false,
      DailyStepActionType.Add | DailyStepActionType.Delete
    ),
  },
};

export { initialState };
