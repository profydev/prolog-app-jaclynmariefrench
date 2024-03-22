import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
      req.reply({
        delayMs: 2000, // delay the response by 2 seconds
        body: mockProjects,
      });
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  it("displays the loading screen", () => {
    //Checks that loading screen is visible
    cy.get('[data-testid="loading-container"]').should("be.visible");

    // wait for request to resolve
    cy.wait("@getProjects");

    //Ensures that project list appears after loading
    cy.get('[data-testid="loading-container"]').should("not.exist");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects and has correct statues", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          let expectedColor;
          let expectedText;
          let badgeColor;

          switch (mockProjects[index].status) {
            case "error":
              expectedColor = "rgb(254, 243, 242)";
              expectedText = "critical";
              badgeColor = "error";
              break;
            case "info":
              expectedColor = "rgb(236, 253, 243)";
              expectedText = "stable";
              badgeColor = "success";
              break;
            case "warning":
              expectedColor = "rgb(255, 250, 235)";
              expectedText = "warning";
              badgeColor = "warning";
              break;
          }

          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el)
            .find(`[data-testid="badge-${badgeColor}"]`)
            .should("exist")
            .and("have.css", "background-color", expectedColor)
            .and("contain", capitalize(expectedText));
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("error screen and page reload successful", () => {
      //set up failed GET call
      cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
        req.reply({
          statusCode: 500,
          body: { message: "An error occurred" },
        });
      }).as("getProjects");
      //triggers failed GET call
      cy.reload();

      //finding project-error component
      cy.get('[data-testid="project-error"]', { timeout: 10000 }).should(
        "be.visible",
      );

      //set up a successful GET call
      cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
        req.reply({
          delayMs: 2000,
          body: mockProjects,
        });
      }).as("getProjectsRetry");

      //clicking the try again button
      cy.get('[data-testid="project-error"] button').click();

      //waiting for the retry to resolve
      cy.wait("@getProjectsRetry");

      //Checking that the project-error component is no longer showing
      cy.get('[data-testid="project-error"]').should("not.exist");
    });
  });
});
