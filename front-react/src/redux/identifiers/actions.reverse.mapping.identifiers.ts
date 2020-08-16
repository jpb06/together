import { getEnumKeyByEnumValue } from "../../logic/enum.util";
import { pascalCased } from "../../logic/string.util";
import {
    ActionWithPayload, ReduxActionContext as Context, ReduxActionModifiers as Modifier,
    ReduxActionType as Type
} from "../../types/redux";

export const getContextFrom = (action: ActionWithPayload<any>): Context => {
  try {
    const chunks = action.type.split("_");
    if (chunks.length !== 3) throw new Error();

    const actionContext = chunks.pop();
    const context =
      Context[pascalCased(actionContext as string) as keyof typeof Context];

    if (!context) throw new Error();

    return context;
  } catch (error) {
    throw new Error(`Unable to get action context for ${action.type}`);
  }
};

export const extractActionTypeParts = (
  action: ActionWithPayload<any>
): { types: Array<Type>; modifier: Modifier; context: Context } | undefined => {
  const chunks = action.type.split("_");
  if (chunks.length !== 3) return undefined;

  const context = pascalCased(chunks.pop() as string);
  if (!(context in Context)) return undefined;

  const modifier = getEnumKeyByEnumValue(Modifier, chunks.pop() as string);
  if (!modifier) return undefined;

  const typeChunks = (chunks.pop() as string).split("|");
  const types = typeChunks
    .map((el) => getEnumKeyByEnumValue(Type, el))
    .filter((el) => el !== null)
    .map((el) => Type[el as keyof typeof Type]);

  if (types.length > 0) {
    return {
      types,
      modifier: Modifier[modifier as keyof typeof Modifier],
      context: Context[context as keyof typeof Context],
    };
  }

  return undefined;
};
