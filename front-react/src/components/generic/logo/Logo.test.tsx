import React from "react";

import { logRoles, screen } from "@testing-library/react";

import { connectedRender } from "../../../redux/test-utils/connected.render.helper";
import Logo, { LogoColor } from "./Logo";

describe("Logo component", () => {
  it("should be centered by default", () => {
    connectedRender(<Logo color={LogoColor.Primary} />);

    expect(screen.getByRole("link", { name: "Together" })).toHaveStyle(
      "justify-content: center;"
    );
  });

  it("should be not centered", () => {
    connectedRender(<Logo color={LogoColor.Primary} isCentered={false} />);

    expect(screen.getByRole("link", { name: "Together" })).not.toHaveStyle(
      "justify-content: center;"
    );
  });

  it("should not have large fonts by default", () => {
    connectedRender(<Logo color={LogoColor.Primary} />);

    expect(
      screen.getByRole("link", { name: "Together" }).children[0]
    ).toHaveStyle("font-size: x-large;");
  });

  it("should have large fonts", () => {
    connectedRender(<Logo color={LogoColor.Primary} isLargeFont />);

    expect(
      screen.getByRole("link", { name: "Together" }).children[0]
    ).toHaveStyle("font-size: xx-large;");
  });

  it("should not have a description text by default", () => {
    connectedRender(<Logo color={LogoColor.Primary} />);

    expect(
      screen.queryByText("A tool for SCRUM teams")
    ).not.toBeInTheDocument();
  });

  it("should have a description text", () => {
    connectedRender(<Logo color={LogoColor.Primary} hasDescriptionText />);

    screen.getByText("A tool for SCRUM teams");
  });

  it("should have a link to /main by default", () => {
    connectedRender(<Logo color={LogoColor.Primary} />);

    expect(screen.getByRole("link", { name: "Together" })).toHaveAttribute(
      "href",
      "/main"
    );
  });

  it("should not have a link to /main", () => {
    connectedRender(<Logo color={LogoColor.Primary} isIndexLinkDisabled />);

    expect(screen.getByRole("link", { name: "Together" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("should use theme primary color", () => {
    connectedRender(<Logo color={LogoColor.Primary} />);

    expect(screen.getByRole("link", { name: "Together" })).toHaveStyle(
      "color: rgb(63, 81, 181);"
    );
  });

  it("should use theme secondary", () => {
    connectedRender(<Logo color={LogoColor.Secondary} />);

    expect(screen.getByRole("link", { name: "Together" })).toHaveStyle(
      "color: rgb(245, 0, 87);"
    );
  });

  it("should use white as color", () => {
    connectedRender(<Logo color={LogoColor.White} />);

    expect(screen.getByRole("link", { name: "Together" })).toHaveStyle(
      "color: white;"
    );
  });
});
