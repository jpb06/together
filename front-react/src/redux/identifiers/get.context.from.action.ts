import { pascalCased } from "../../logic/string.util";
import { ActionWithPayload, ReduxActionContext as Context } from "../../types/redux";

export const getContextFrom = (action: ActionWithPayload<any>): Context => {
  try {
    const actionContext = action.type.split("_").pop();
    if (!actionContext) throw new Error();

    const context =
      Context[pascalCased(actionContext as string) as keyof typeof Context];

    return context;
  } catch (error) {
    throw new Error(`Unable to get action context for ${action.type}`);
  }
};
