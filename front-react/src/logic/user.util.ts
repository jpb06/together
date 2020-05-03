import User, { NewUser } from "../types/user.type";
import { ApiLoginResult } from "../api/anonymous/login.api";
import LocalStorageKeys from "./local.storage.keys";
import * as localStorage from "local-storage";

const getInitials = (name: string) => {
  const initials = name.replace(/[^a-zA-Z- 0-9]/g, "").match(/\b\w/g);
  if (!initials) return "";

  return initials.join("").toUpperCase();
};

export function addComputedPropertiesToUser(user: User) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = getInitials(fullName);

  return {
    ...user,
    fullName,
    initials,
  };
}

const initializeLoggedUserContext = (authResult: ApiLoginResult): User => {
  const user = addComputedPropertiesToUser(authResult.user);

  localStorage.set(LocalStorageKeys.token, authResult.token);
  localStorage.set(LocalStorageKeys.expiration, authResult.expirationDate);
  localStorage.set(LocalStorageKeys.user, user);
  if (authResult.user.teams.length > 0) {
    localStorage.set(LocalStorageKeys.currentTeam, authResult.user.teams[0]);
  }

  return user;
};

const validateEmail = (input: string) =>
  input.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

const isPasswordValid = (
  isFormSubmitted: boolean,
  password: string,
  confirmPassword: string
) => {
  if (!isFormSubmitted) return true;

  return (
    password !== "" && confirmPassword !== "" && password === confirmPassword
  );
};

const isNewUserDataValid = (user: NewUser) =>
  user.firstName.length > 0 &&
  user.lastName.length > 0 &&
  validateEmail(user.email) &&
  isPasswordValid(true, user.password, user.confirmPassword);

export {
  getInitials,
  initializeLoggedUserContext,
  validateEmail,
  isPasswordValid,
  isNewUserDataValid,
};
