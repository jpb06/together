import { BareTeam, TeamWithLastActivity } from "../stack-shared-code/types";

export const teamsDoMatch = (
  initialteams: Array<BareTeam>,
  updatedTeams: Array<TeamWithLastActivity>
): boolean => {
  if (initialteams.length !== updatedTeams.length) return false;

  initialteams.forEach((team) => {
    if (!updatedTeams.some((updated) => updated.id === team.id)) return false;
  });

  return true;
};
