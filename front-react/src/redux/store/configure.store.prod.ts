import { createStore, applyMiddleware } from "redux";
import rootReducer from "./../reducers";
import thunk from "redux-thunk";
import { RootState } from "./root.state";

export default function configureStore(preloadedState?: RootState) {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}
