import React from "react";

import { logRoles, render, screen } from "@testing-library/react";

import DailyComment from "./DailyComment";
import { NewDailyCommentKind } from "./new-item/NewDailyComment";

describe("Daily comment component", () => {
  it("should display nothing if given an invalid underlying type", () => {
    const { container } = render(
      <DailyComment
        type={NewDailyCommentKind.Feeling}
        underlyingType={100}
        label="Yolo"
      />
    );
    expect(container.childNodes.length).toBe(0);
  });
});
