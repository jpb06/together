import { createStore, applyMiddleware } from "redux";
import rootReducer from "./../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { RootState } from "./root.state";

export default function configureStore(preloadedState?: RootState) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
