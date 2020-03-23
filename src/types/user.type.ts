import LocalStorageKeys from "../logic/local.storage.keys";
import * as localStorage from "local-storage";
import { ApiLoginResult } from "../api/anonymous/login.api";

export default interface User {
  token: string;
  expirationDate: string;
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  avatarName: string;
  teams: Array<any>;
  teamInvites: Array<any>;
  teamJoinRequests: Array<any>;
  // computed client side
  fullName: string;
  initials: string;
}

const getInitials = (name: string) => {
  const initials = name.replace(/[^a-zA-Z- 0-9]/g, "").match(/\b\w/g);
  if (!initials) return "";

  return initials.join("").toUpperCase();
};

const initializeLoggedUserContext = (authResult: ApiLoginResult): User => {
  const fullName = `${authResult.user.firstName} ${authResult.user.lastName}`;
  const initials = getInitials(fullName);

  const user: User = {
    ...authResult.user,
    fullName,
    initials
  };

  localStorage.set(LocalStorageKeys.token, authResult.token);
  localStorage.set(LocalStorageKeys.expiration, authResult.expirationDate);
  localStorage.set(LocalStorageKeys.user, user);
  localStorage.set(LocalStorageKeys.currentTeam, authResult.user.teams[0]);

  return user;
};

const validateEmail = (input: string) =>
  input.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

export { getInitials, initializeLoggedUserContext, validateEmail };
