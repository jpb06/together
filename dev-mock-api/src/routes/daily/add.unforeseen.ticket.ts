import { Application } from "express";
import { Request, Response } from "express-serve-static-core";
import isAuthenticated from "../../middleware/is.authenticated";
import { body } from "express-validator";
import { getUsers } from "../../dbase/fetch.mock.db";
import { getOrCreateDaily } from "../../util/daily";
import { userToTerseUser } from "../../util/types.conversion.helpers";
import { persistDaily } from "../../dbase/update.mock.db";
import { mongoObjectId } from "../../util/objectid";

const mapAddUnforeseenTicket = (server: Application) => {
  server.post(
    "/api/daily/unforeseen/add",
    isAuthenticated,
    [
      body("teamId").isMongoId(),
      body("date").isISO8601().toDate(),
      body("ticket").isString().not().isEmpty(),
    ],
    (req: Request, res: Response) => {
      const users = getUsers();

      const creator = users.find((el) => el.email === res.locals.email);
      if (!creator) {
        return res.answer(500, "Unable to retrieve ticket creator");
      }

      const daily = getOrCreateDaily(req.body.teamId, req.body.date);
      const newTicket = {
        id: mongoObjectId(),
        name: req.body.ticket,
        creator: userToTerseUser(creator),
      };
      daily.unforeseenTickets.push(newTicket);
      persistDaily(daily);

      return res.populate(newTicket);
    }
  );
};

export default mapAddUnforeseenTicket;
