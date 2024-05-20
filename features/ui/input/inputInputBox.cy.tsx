import React from "react";
import { InputBox } from "./input";
import { InputIcon } from "./input-icon";

describe("<InputBox />", () => {
  const placeholderText = "Text Here";
  const label = "Label";
  const icon = <InputIcon src="/icons/mail.svg" />;
  const errorText = "Error Text";
  const hint = "Hint text";

  it("Input box placeholder and typing is working", () => {
    const value = "value";

    cy.mount(
      <InputBox
        value={value}
        onChange={() => {}}
        placeholder={placeholderText}
        label={label}
        disabled={false}
        hint=""
        error=""
      />,
    );
    //Checking if placeholder is present
    cy.get("input[placeholder]").should(
      "have.attr",
      "placeholder",
      placeholderText,
    );

    //Check if the label is present
    cy.contains(label);
  });

  it("Input focus is working", () => {
    const value = "value";
    cy.mount(
      <InputBox
        value={value}
        onChange={() => {}}
        placeholder={placeholderText}
        label={label}
        disabled={false}
        hint=""
        error=""
      />,
    );

    //focus
    cy.get("input").focus();

    //Checking input has focus
    cy.get("input[placeholder]").should(
      "have.attr",
      "placeholder",
      placeholderText,
    );

    //Checking border styling
    cy.get("input:focus").should(
      "have.css",
      "border-color",
      "rgb(214, 187, 251)",
    );
  });

  it("Input icon and error icon is working", () => {
    const value = "value";
    cy.mount(
      <InputBox
        value={value}
        onChange={() => {}}
        placeholder={placeholderText}
        label={label}
        disabled={false}
        hint=""
        error=""
        icon={icon}
      />,
    );
    //Checking error border and icon is present
    cy.get('[data-testid="input-icon"]').should("be.visible");

    cy.mount(
      <InputBox
        value={value}
        onChange={() => {}}
        placeholder={placeholderText}
        label={label}
        disabled={false}
        hint=""
        error={errorText}
        icon={icon}
      />,
    );

    cy.get('[data-testid="input-error"]').should("be.visible");

    //Checking border styling
    cy.get("input").should("have.css", "border-color", "rgb(253, 162, 155)");
  });

  it("Hint and error messages are working", () => {
    const value = "value";
    //With an error
    cy.mount(
      <InputBox
        value={value}
        onChange={() => {}}
        placeholder={placeholderText}
        label={label}
        disabled={false}
        hint={hint}
        error={errorText}
        icon={icon}
      />,
    );

    cy.get('[data-testid="input-error"]').should("be.visible");
    cy.get('[data-testid="input-hint"]').should("not.exist");

    //Without an error
    cy.mount(
      <InputBox
        value={value}
        onChange={() => {}}
        placeholder={placeholderText}
        label={label}
        disabled={false}
        hint={hint}
        error=""
        icon={icon}
      />,
    );

    cy.get('[data-testid="input-hint"]').should("be.visible");
    cy.get('[data-testid="input-error"]').should("not.exist");
  });
});
