import * as db from "./data/db.json";
import Database from "../types/database.type";
import { Team } from "../../../shared/types/interfaces/team.interfaces";
import { PersistedUser as User } from "../../../shared/types/interfaces/user.interfaces";
import Daily from "../../../shared/types/interfaces/daily.interfaces";

export const getUsers = () => (<Database>db).users as Array<User>;
export const getTeams = () => (<Database>db).teams as Array<Team>;
export const getDailies = () => (<Database>db).dailies as Array<Daily>;
