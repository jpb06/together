import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";
import { errorReducer } from "./error.reducer";
import { apiStatusReducer } from "./api.status.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  apiCallsInProgress: apiStatusReducer
});

export default rootReducer;
