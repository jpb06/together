import { RootState } from "../store/root.state";

export const isSnackbarOpen = (state: RootState) => state.snackbar.isOpen;
