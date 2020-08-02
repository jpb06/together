import { ActionWithPayload, ReduxActionType as Type, SnackbarData } from "../../../types/redux";
import { initialState } from "../../store/root.state";

const snackbarReducer = (
  data: SnackbarData = initialState.snackbar,
  action: ActionWithPayload<SnackbarData>
) => {
  switch (action.type) {
    case Type.Snackbar:
      return action.payload;
    case Type.ClearSnackbar:
      return { ...data, isOpen: false };
  }

  return data;
};

export default snackbarReducer;
