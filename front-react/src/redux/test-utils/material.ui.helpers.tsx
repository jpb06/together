import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const selectMaterialUiSelectOption = async (
  element: HTMLElement,
  optionText: string,
  name: string
) => {
  // The button that opens the dropdown, which is a sibling of the input
  const selectButton = element?.parentNode?.querySelector("[role=button]");
  if (!selectButton)
    throw new Error(
      `Unable to locate select button for ${name} to choose ${optionText}`
    );

  userEvent.click(selectButton);

  await screen.findByRole("presentation");

  const option = screen.getByRole("option", { name: optionText });

  option.attributes.removeNamedItem("data-value");
  const attr = document.createAttribute("data-value");
  attr.value = "800";
  option.attributes.setNamedItem(attr);

  userEvent.click(option);
};
