import { addComputedPropertiesToUser } from "../../logic/user.util";
import * as localStorage from "local-storage";
import LocalStorageKeys from "../../logic/local.storage.keys";
import User from "../../types/user.type";

export default function initUser() {
  const user = localStorage.get<User | null>(LocalStorageKeys.user);

  return user ? addComputedPropertiesToUser(user) : null;
}
