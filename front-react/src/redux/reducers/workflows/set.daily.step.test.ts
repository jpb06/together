import { DailyStepActionType, setDailyStep } from "./daily.state.logic";

describe("setDailyStep", () => {
  it("should use defaults for initialization", () => {
    const result = setDailyStep();
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: false,
      },
    });
  });

  it("should extend initial object", () => {
    const result = setDailyStep({ yolo: true });
    expect(result).toStrictEqual({
      yolo: true,
      globalFeedback: {
        isValidated: false,
        isPending: false,
      },
    });
  });

  it("should set validation", () => {
    const result = setDailyStep({}, true);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: true,
        isPending: false,
      },
    });
  });

  it("should set loading indicator", () => {
    const result = setDailyStep({}, false, true);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: true,
      },
    });
  });

  it("should set add feedback", () => {
    const result = setDailyStep({}, false, false, DailyStepActionType.Add);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: false,
      },
      addActionFeedback: {
        isPending: false,
        isErrored: false,
        text: "Add",
      },
    });
  });

  it("should set add feedback as pending", () => {
    const result = setDailyStep({}, false, true, DailyStepActionType.Add);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: true,
      },
      addActionFeedback: {
        isPending: true,
        isErrored: false,
        text: "Adding ticket...",
      },
    });
  });

  it("should set add feedback as errored", () => {
    const result = setDailyStep(
      {},
      false,
      false,
      DailyStepActionType.Add,
      true
    );
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: false,
      },
      addActionFeedback: {
        isPending: false,
        isErrored: true,
        text: "Add",
      },
    });
  });

  it("should set delete feedback", () => {
    const result = setDailyStep({}, false, false, DailyStepActionType.Delete);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: false,
      },
      deleteActionFeedback: {
        isPending: false,
        term: "",
      },
    });
  });

  it("should set delete feedback as pending with term", () => {
    const result = setDailyStep(
      {},
      false,
      true,
      DailyStepActionType.Delete,
      false,
      "Yolo"
    );
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: true,
      },
      deleteActionFeedback: {
        isPending: true,
        term: "Yolo",
      },
    });
  });
});
