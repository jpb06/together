import { notice } from "./util/generic.actions";
import { BEGIN_API_CALL } from "./util/action.types";
import { Action } from "redux";

const beginApiCallAction = (): Action => notice(BEGIN_API_CALL);

export default beginApiCallAction;
