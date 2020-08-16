import { initDailyDurationStep } from "./daily.state.logic";

describe("initDailyDurationStep", () => {
  it("should initialize to defaults", () => {
    const result = initDailyDurationStep();
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: false,
        isPending: false,
      },
    });
  });

  it("should set validation", () => {
    const result = initDailyDurationStep(true);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: true,
        isPending: false,
      },
    });
  });

  it("should set loading indicator", () => {
    const result = initDailyDurationStep(true, true);
    expect(result).toStrictEqual({
      globalFeedback: {
        isValidated: true,
        isPending: true,
      },
    });
  });
});
