import { ReduxActionType as Type } from "../../../types/redux";
import { answerTeamInvite } from "../../api/user/answer.team.invite";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchAnswerTeamInvite() {
  yield safeTakeLeading(Type.AnswerTeamInvite, answerTeamInvite);
}
