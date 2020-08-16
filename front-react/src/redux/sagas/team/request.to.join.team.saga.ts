import { ReduxActionType as Type } from "../../../types/redux";
import { safeTakeLeadingFor } from "../../effects/safe.take.leading.helper";
import { requestToJoinTeamTask } from "../../tasks/user/request.to.join.team.task";

export function* watchRequestToJoinTeam() {
  yield safeTakeLeadingFor([Type.RequestToJoinTeam], requestToJoinTeamTask);
}
