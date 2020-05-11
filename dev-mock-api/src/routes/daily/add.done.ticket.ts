import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getUsers } from "../../dbase/fetch.mock.db";
import { PersistedUser } from "../../types/persisted.user.type";
import { getOrCreateDaily } from "../../util/daily";
import { userToTerseUser } from "../../util/types.conversion.helpers";
import { persistDaily } from "../../dbase/update.mock.db";
import { mongoObjectId } from "../../util/objectid";

const mapAddDoneTicket = (server: Application) => {
  server.post(
    "/api/daily/done/add",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("assigneeEmail").isEmail(),
      body("date").isISO8601().toDate(),
      body("ticket").isString().not().isEmpty(),
    ],
    (req: Request, res: Response) => {
      let users = getUsers();

      const creator = users.find((el) => el.email === res.locals.email) as
        | PersistedUser
        | undefined;

      if (!creator) {
        return res.answer(500, "Unable to retrieve ticket creator");
      }

      const assignee = users.find(
        (el) => el.email === req.body.assigneeEmail
      ) as PersistedUser | undefined;

      if (!assignee) {
        return res.answer(500, "Unable to retrieve ticket assignee");
      }

      const daily = getOrCreateDaily(req.body.teamId, req.body.date);

      const newTicket = {
        id: mongoObjectId(),
        name: req.body.ticket,
        creator: userToTerseUser(creator),
        assignee: userToTerseUser(assignee),
      };
      daily.doneTickets.push(newTicket);
      persistDaily(daily);

      return res.populate(newTicket);
    }
  );
};

export default mapAddDoneTicket;
