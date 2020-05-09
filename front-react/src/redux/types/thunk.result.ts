import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/root.state";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;
