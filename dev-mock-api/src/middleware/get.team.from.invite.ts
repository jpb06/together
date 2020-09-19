import { NextFunction, Request } from "express";

import { getTeams, getUsers } from "../dbase/fetch.mock.db";
import { ApiResponse } from "../types/api.response.type";

export default function getTeamFromInvite(
  req: Request,
  res: ApiResponse,
  next: NextFunction
) {
  const users = getUsers();
  const teams = getTeams();

  const user = users.find((el) => el.email === res.locals.email);
  if (!user) {
    return res.answer(520, "Unable to get the current user");
  }

  const matchingInvite = user.teamInvites.find(
    (el) => el.id === req.body.inviteId
  );
  if (!matchingInvite) {
    return res.answer(520, "Unable to find the team join invite");
  }

  const team = teams.find((el) => el.id === matchingInvite.team.id);
  if (!team) {
    return res.answer(520, "Unable to find the targeted team");
  }

  res.locals.user = user;
  res.locals.invite = matchingInvite;
  res.locals.team = team;

  next();
}
