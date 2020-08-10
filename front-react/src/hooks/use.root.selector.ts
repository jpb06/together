import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "../redux/store/root.state";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
