import * as db from "./data/db.json";
import Database from "../types/database.type";

const getUsers = () => (<Database>db).users;
const getTeams = () => (<Database>db).teams;
const getDailies = () => (<Database>db).dailies;

export { getUsers, getTeams, getDailies };
