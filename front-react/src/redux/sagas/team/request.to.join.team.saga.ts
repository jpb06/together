import { ReduxActionType as Type } from "../../../types/redux";
import { requestToJoinTeamTask } from "../../tasks/user/request.to.join.team.task";
import { safeTakeLeading } from "../generic/safe.take.leading.helper";

export function* watchRequestToJoinTeam() {
  yield safeTakeLeading([Type.RequestToJoinTeam], requestToJoinTeamTask);
}
