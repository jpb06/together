import * as localStore from "local-storage";

import { LoginResult } from "../redux/tasks/user/login.task";
import { LoggedUser, NewUser, User } from "../stack-shared-code/types";
import LocalStorageKeys from "./local.storage.keys";

export const getInitials = (name: string) => {
  const initials = name.replace(/[^a-zA-Z- 0-9]/g, "").match(/\b\w/g);
  if (!initials) return "";

  return initials.join("").toUpperCase();
};

export const addComputedPropertiesToUser = (user: LoggedUser) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
  initials: getInitials(`${user.firstName} ${user.lastName}`),
});

export const initializeUserFromLocalStorage = () => {
  const user = localStore.get<User | null>(LocalStorageKeys.user);

  return user ? addComputedPropertiesToUser(user) : null;
};

export const initializeLoggedUserContext = (authResult: LoginResult): User => {
  const user = addComputedPropertiesToUser(authResult.user);

  localStore.set(LocalStorageKeys.token, authResult.token);
  localStore.set(LocalStorageKeys.expiration, authResult.expirationDate);
  localStore.set(LocalStorageKeys.user, user);
  if (authResult.user.teams.length > 0) {
    localStore.set(LocalStorageKeys.currentTeam, authResult.user.teams[0]);
  }

  return user;
};

export const validateEmail = (input: string) =>
  input.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

export const isPasswordValid = (
  isFormSubmitted: boolean,
  password: string,
  confirmPassword: string
) => {
  if (!isFormSubmitted) return true;

  return (
    password !== "" && confirmPassword !== "" && password === confirmPassword
  );
};

export const isNewUserDataValid = (user: NewUser) =>
  user.firstName.length > 0 &&
  user.lastName.length > 0 &&
  validateEmail(user.email) &&
  isPasswordValid(true, user.password, user.confirmPassword);
