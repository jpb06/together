import { Result, Type, Context } from "../../types/action.types";

export const typeFor = (action: Type, context: Context, result: Result) =>
  action + result + context;

export const beginApiCallFor = (context: Context) =>
  Type.beginApiCall + context;
