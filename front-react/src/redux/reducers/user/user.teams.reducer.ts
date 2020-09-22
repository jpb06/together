import { TeamWithLastActivity } from "../../../stack-shared-code/types";
import { ActionWithPayload, ReduxActionType as Type } from "../../../types/redux";
import { isSuccessFor } from "../../identifiers/generic.actions.identifiers";
import { initialState } from "../../store/root.state";
import { InviteUserToTeamResult } from "../../tasks";

const userTeamsReducer = (
  state: Array<TeamWithLastActivity> = initialState.userTeams,
  action: ActionWithPayload<any>
) => {
  if (isSuccessFor(Type.Login, action.type)) {
    return [];
  }
  if (isSuccessFor(Type.GetUserTeams, action.type)) {
    return action.payload as Array<TeamWithLastActivity>;
  }
  if (isSuccessFor(Type.InviteUserToTeam, action.type)) {
    const payload = action.payload as InviteUserToTeamResult;
    return state.map((team) =>
      team.id === payload.teamId
        ? {
            ...team,
            invitedUsers: [
              ...team.invitedUsers,
              {
                id: "",
                date: new Date().toISOString(),
                invitee: payload.user,
                referrer: payload.user,
              },
            ],
          }
        : team
    );
  }

  return state;
};

export default userTeamsReducer;
