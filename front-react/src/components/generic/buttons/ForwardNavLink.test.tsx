import React from "react";

import { screen } from "@testing-library/react";

import { connectedRender } from "../../../test-utils/redux/connected.render.helper";
import ForwardNavLink from "./ForwardNavLink";

describe("Forward nav link component", () => {
  it("should generate a link", () => {
    connectedRender(<ForwardNavLink to="/yolo">That's a text</ForwardNavLink>);

    const mainLink = screen.getByRole("link", {
      name: /that's a text/i,
    });
    expect(mainLink).toHaveAttribute("href", "/yolo");
  });
});
