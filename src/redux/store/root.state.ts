import User from "../../types/user.type";
import { ApplicationError } from "../../types/application.error.type";

export interface RootState {
  readonly user: User | null;
  readonly error: ApplicationError | null;
  readonly apiCallsInProgress: number;
}

const initialState: RootState = {
  user: null,
  error: null,
  apiCallsInProgress: 0
};

export { initialState };
