import { ReduxActionType as Type } from "../../../types/redux";
import { requestToJoinTeamTask } from "../../tasks/user/request.to.join.team.task";
import { safeTakeLeadingFor } from "../generic/safe.take.leading.helper";

export function* watchRequestToJoinTeam() {
  yield safeTakeLeadingFor([Type.RequestToJoinTeam], requestToJoinTeamTask);
}
