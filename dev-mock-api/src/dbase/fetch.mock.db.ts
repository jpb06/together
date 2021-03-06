import {
    Daily, PersistedUser as User, Team
} from "../../../front-react/src/stack-shared-code/types";
import Database from "../types/database.type";
import db from "./data/db.json";

export const getUsers = () => (<Database>db).users as Array<User>;
export const getTeams = () => (<Database>db).teams as Array<Team>;
export const getDailies = () => (<Database>db).dailies as Array<Daily>;
