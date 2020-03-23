import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/store/root.state";

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;
const useReduxDispatch = (): ReduxDispatch => {
  return useDispatch<ReduxDispatch>();
};
const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useReduxDispatch, useReduxSelector };
