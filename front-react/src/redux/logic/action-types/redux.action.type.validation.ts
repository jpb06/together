import { Type, Result, Context } from "../../types/action.types";

class ReduxActionTypeValidator {
  readonly input: string;
  private isTypeValidated: boolean;
  private isResultValidated: boolean;
  private isContextValidated: boolean;

  constructor(input: string) {
    this.input = input;
    this.isTypeValidated = true;
    this.isResultValidated = true;
    this.isContextValidated = true;
  }

  is(type: Type) {
    this.isTypeValidated = this.input.includes(type);
    return this;
  }
  as(result: Result) {
    this.isResultValidated = this.input.includes(result);
    return this;
  }
  for(context: Context) {
    this.isContextValidated = this.input.endsWith(context);
    return this;
  }

  truthy = () =>
    this.isTypeValidated && this.isResultValidated && this.isContextValidated;
}
export const check = (type: string) => new ReduxActionTypeValidator(type);
