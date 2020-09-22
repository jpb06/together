import React from "react";

import InfoIcon from "@material-ui/icons/Info";
import { render, screen } from "@testing-library/react";

import TopLevelFeedback from "./TopLevelFeedback";

describe("App snackbar component", () => {
  it("should display an icon", async () => {
    render(
      <TopLevelFeedback
        title="Yolo"
        content="Cool and great but alse good"
        Icon={InfoIcon}
      />
    );

    screen.getByRole("img", { name: /feedback-icon/i });
  });

  it("should display the requested title", async () => {
    render(
      <TopLevelFeedback
        title="Yolo"
        content="Cool and great but alse good"
        Icon={InfoIcon}
      />
    );

    screen.getByText("Yolo");
  });

  it("should display the requested content", async () => {
    render(
      <TopLevelFeedback
        title="Yolo"
        content="Cool and great but also good"
        Icon={InfoIcon}
      />
    );

    screen.getByText("Cool and great but also good");
  });
});
