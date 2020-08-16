import { ActionWithPayload, ReduxActionType as Type, SnackbarData } from "../../../types/redux";
import { initialState } from "../../store/root.state";

const snackbarReducer = (
  data: SnackbarData = initialState.snackbar,
  action: ActionWithPayload<any>
) => {
  switch (action.type) {
    case Type.Snackbar:
      return action.payload as SnackbarData;
    case Type.ClearSnackbar:
      return { ...data, isOpen: false };
  }

  return data;
};

export default snackbarReducer;
