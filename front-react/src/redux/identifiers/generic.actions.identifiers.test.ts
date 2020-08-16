import { ReduxActionContext as Context, ReduxActionType as Type } from "../../types/redux";
import { payloadAction, sagaPayloadAction, successPayloadAction } from "../actions";
import {
    isActionSagaBelongingTo, isActionSagaFor, isSagaForString, isSuccess, isSuccessOrFailureIn
} from "./generic.actions.identifiers";

describe("Generic actions identifiers", () => {
  describe("isSuccess", () => {
    it("should return true for a succeeded action", () => {
      const action = successPayloadAction(Type.GetUserTeams, Context.Daily);
      expect(isSuccess(action.type)).toBe(true);
    });
    it("should return false for trivial action", () => {
      const action = payloadAction(Type.GetUserTeams);
      expect(isSuccess(action.type)).toBe(false);
    });
    it("should return false for a saga action", () => {
      const action = sagaPayloadAction(Type.GetUserTeams, Context.Global);
      expect(isSuccess(action.type)).toBe(false);
    });
  });

  describe("isSuccessOrFailureIn", () => {
    it("should return true for a succeeded action", () => {
      const action = successPayloadAction(Type.GetUserTeams, Context.Daily);
      expect(isSuccessOrFailureIn(Context.Daily, action.type)).toBe(true);
    });
    it("should return false for a succeeded action in another context", () => {
      const action = successPayloadAction(Type.GetUserTeams, Context.Daily);
      expect(isSuccessOrFailureIn(Context.Global, action.type)).toBe(false);
    });
    it("should return true for a snackbar saga action", () => {
      const action = sagaPayloadAction(Type.Snackbar, Context.Daily);
      expect(isSuccessOrFailureIn(Context.Daily, action.type)).toBe(true);
    });
    it("should return false for a snackbar saga action in another context", () => {
      const action = sagaPayloadAction(Type.Snackbar, Context.Daily);
      expect(isSuccessOrFailureIn(Context.Onboarding, action.type)).toBe(false);
    });
  });

  describe("isSagaForString", () => {
    it("should return true for a saga action", () => {
      const action = sagaPayloadAction(Type.Login, Context.Global);
      expect(isSagaForString("LOGIN", action.type)).toBe(true);
    });
    it("should return false for a succeeded action", () => {
      const action = successPayloadAction(Type.Login, Context.Global);
      expect(isSagaForString("LOGIN", action.type)).toBe(false);
    });
  });

  describe("isActionBelongingTo", () => {
    it("should return false if the action is not a saga", () => {
      const action = payloadAction(Type.GetTimeline);
      const types = [Type.GetTimeline];
      const result = isActionSagaBelongingTo(types)(action);
      expect(result).toBe(false);
    });

    it("should return false if the action is a saga but is not within the input types", () => {
      const action = sagaPayloadAction(Type.Login, Context.Global);
      const types = [Type.GetTimeline, Type.GetDaily];
      const result = isActionSagaBelongingTo(types)(action);
      expect(result).toBe(false);
    });

    it("should return true if the action is a saga and is the input type", () => {
      const action = sagaPayloadAction(Type.GetDaily, Context.Global);
      const types = [Type.GetDaily];
      const result = isActionSagaBelongingTo(types)(action);
      expect(result).toBe(true);
    });

    it("should return true if the action is a saga and is within the input types", () => {
      const action = sagaPayloadAction(Type.GetDaily, Context.Global);
      const types = [Type.GetDaily, Type.GetTimeline, Type.GetUserTeams];
      const result = isActionSagaBelongingTo(types)(action);
      expect(result).toBe(true);
    });
  });

  describe("isActionSagaFor", () => {
    it("should return false for a misc action", () => {
      const action = payloadAction(Type.GetTimeline);
      const type = "GET-TIMELINE";
      const result = isActionSagaFor(type)(action);
      expect(result).toBe(false);
    });

    it("should return true for a saga action", () => {
      const action = sagaPayloadAction(Type.GetTimeline, Context.Global);
      const type = "GET-TIMELINE";
      const result = isActionSagaFor(type)(action);
      expect(result).toBe(true);
    });
  });
});
