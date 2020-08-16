import {
    ReduxActionContext as Context, ReduxActionModifiers as Modifier, ReduxActionType as Type
} from "../../types/redux";
import { payloadAction, sagaPayloadAction, successPayloadAction } from "../actions";
import { extractActionTypeParts, getContextFrom } from "./actions.reverse.mapping.identifiers";

describe("getContextFrom", () => {
  it("should get Modal context", () => {
    const context = getContextFrom(
      sagaPayloadAction(Type.CreateTeam, Context.Modal)
    );
    expect(context).toBe(Context.Modal);
  });

  it("should get Onboarding context", () => {
    const context = getContextFrom(
      sagaPayloadAction(Type.CreateTeam, Context.Onboarding)
    );
    expect(context).toBe(Context.Onboarding);
  });

  it("should throw an error if action has no context", () => {
    const action = payloadAction(Type.CreateTeam);
    expect(() => getContextFrom(action)).toThrow(
      new Error(`Unable to get action context for ${action.type}`)
    );
  });

  it("should throw an error if context is invalid", () => {
    const action = sagaPayloadAction(Type.CreateTeam, "Yolo" as Context);
    expect(() => getContextFrom(action)).toThrow(
      new Error(`Unable to get action context for ${action.type}`)
    );
  });
});

describe("extractActionTypeParts", () => {
  it("should get parts for a saga", () => {
    const type = Type.CreateTeam;
    const action = sagaPayloadAction(type, Context.Modal);
    const parts = extractActionTypeParts(action);

    expect(parts).toBeDefined;
    expect(parts?.types).toStrictEqual([type]);
    expect(parts?.modifier).toBe(Modifier.Saga);
    expect(parts?.context).toBe(Context.Modal);
  });

  it("should get parts for a succeeded action", () => {
    const type = Type.GetUserTeams;
    const action = successPayloadAction(type, Context.Onboarding);
    const parts = extractActionTypeParts(action);

    expect(parts).toBeDefined;
    expect(parts?.types).toStrictEqual([type]);
    expect(parts?.modifier).toBe(Modifier.Success);
    expect(parts?.context).toBe(Context.Onboarding);
  });

  it("should get parts for a combined saga", () => {
    const types = [Type.CreateTeam, Type.GetTimeline, Type.RemoveDoneTicket];
    const action = sagaPayloadAction(types, Context.Global);
    const parts = extractActionTypeParts(action);

    expect(parts).toBeDefined;
    expect(parts?.types).toStrictEqual(types);
    expect(parts?.modifier).toBe(Modifier.Saga);
    expect(parts?.context).toBe(Context.Global);
  });

  it("should return undefined if types are invalid", () => {
    const types = ["Yolo" as Type, "Man" as Type];
    const action = sagaPayloadAction(types, Context.Global);
    const parts = extractActionTypeParts(action);

    expect(parts).not.toBeDefined;
  });

  it("should return undefined if action has no context nor modifier", () => {
    const action = payloadAction(Type.CreateTeam);
    const parts = extractActionTypeParts(action);

    expect(parts).not.toBeDefined;
  });

  it("should return undefined if modifier is Invalid", () => {
    const action = {
      type: `${Type.CreateTeam}_YOLO_${Context.Global}`,
      payload: {},
    };
    const parts = extractActionTypeParts(action);

    expect(parts).not.toBeDefined;
  });
});
