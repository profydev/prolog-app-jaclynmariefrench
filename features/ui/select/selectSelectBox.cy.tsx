import React from "react";
import { SelectBox } from "./select";
import { SelectIcon } from "./select-icon";

type Option = {
  value: string;
  label: string;
};

describe("<SelectBox />", () => {
  const options: Option[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];
  const placeholderText = "Please choose";
  const label = "Label";
  const errorText = "Error Text";
  const hint = "Hint text";

  it("Select box with placeholder is visible", () => {
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        onChange={(value) => console.log(value)}
      />,
    );
    cy.contains(placeholderText).should("be.visible");
  });

  it("Select box option chosen with correct svgs shown for the up arrow and the option check", () => {
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        onChange={(value) => console.log(value)}
      />,
    );
    //Closed arrow check
    cy.get('[data-testid="select-closed-arrow"]').should("be.visible");
    cy.get('[data-testid="select-box"]').click();

    //Menu and open arrow check
    cy.get('[data-testid="select-options"]').should("be.visible");
    cy.get('[data-testid="select-open-arrow"]').should("be.visible");

    //Click option and check svg test
    cy.get('[data-testid="select-option-0"]').click();
    cy.get('[data-testid="select-box"]').click();
    cy.get('[data-testid="select-check"]').should("be.visible");
  });

  it("Focus, and disable states are working", () => {
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        onChange={(value) => console.log(value)}
      />,
    );
    //Focus and blur
    cy.get('[data-testid="select-box"]').focus().should("have.focus");
    cy.get('[data-testid="select-box"]').blur().should("not.have.focus");

    //Disabled tests
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        onChange={(value) => console.log(value)}
        disabled={true}
      />,
    );
    cy.get('[data-testid="select-box"]').should("be.disabled");
  });

  it("Label and hint shown correctly", () => {
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        label={label}
        hint={hint}
        onChange={(value) => console.log(value)}
      />,
    );

    cy.contains(label).should("be.visible");
    cy.contains(hint).should("be.visible");
  });

  it("Icon shown correctly", () => {
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        icon={<SelectIcon src="/icons/user.svg" />}
        onChange={(value) => console.log(value)}
      />,
    );
    cy.get('[data-testid="select-icon"]').should("be.visible");
  });

  it("Error state shown correctly", () => {
    //With an error
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        hint={hint}
        errorText={errorText}
        onChange={(value) => console.log(value)}
      />,
    );

    cy.get('[data-testid="select-error"]').should("be.visible");
    cy.get('[data-testid="select-hint"]').should("not.exist");

    //Without an error
    cy.mount(
      <SelectBox
        options={options}
        placeholder={placeholderText}
        hint={hint}
        onChange={(value) => console.log(value)}
      />,
    );

    cy.get('[data-testid="select-hint"]').should("be.visible");
    cy.get('[data-testid="select-error"]').should("not.exist");
  });
});
