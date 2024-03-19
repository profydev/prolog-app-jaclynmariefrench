import packageJson from "package.json";

// cypress test that does:
// 1. checks that footer is present on the all the different pages
// 2. checks that version is present and accurate
// 3. links are present and have href and #
// 4. Checks if logo is present
// 5. Check the position of the footer

describe("Footer", () => {
  it("footer is correctly displayed", () => {
    cy.visit("http://localhost:3000/dashboard");
    const viewportHeight = 960;
    cy.viewport(1440, viewportHeight);

    // Checking footer content
    cy.get('[data-cy="footer"]')
      .scrollIntoView()
      .should("be.visible")
      .and("contain", packageJson.version)
      .within(() => {
        cy.get("a").should("have.attr", "href", "#");
        cy.get("img").should("be.visible");
      });

    // Checking footer position
    cy.get('[data-cy="footer"]').then(($footer) => {
      const footerBottom = $footer[0].getBoundingClientRect().bottom;

      expect(footerBottom).to.be.closeTo(viewportHeight, 1);
    });
  });
});
