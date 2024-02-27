describe("Sidebar nav", () => {
  beforeEach(() => {
    //ensures sidebar shows
    cy.viewport(1030, 660);
    cy.visit("http://localhost:3000/dashboard");
  });
  it('has correct mailto link for "Support" button', () => {
    cy.get("a")
      .contains("Support")
      .should("have.attr", "href")
      .and("equal", "mailto:support@prolog-app.com?subject=Support Request: ");
  });
});
