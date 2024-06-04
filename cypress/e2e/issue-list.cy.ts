import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";
import filteredWarning from "../fixtures/issues-page-filter-warning.json";
import filteredUnresolved from "../fixtures/issues-page-filter-unresolved.json";
import filteredSearch from "../fixtures/issues-page-filter-project-search.json";
import filteredClearSelect from "../fixtures/issues-page-filter-clear-select.json";

const fixtureMap = {
  warning_open_fro: filteredSearch,
  warning_open: filteredUnresolved,
  warning: filteredWarning,
  unresolved: filteredUnresolved,
  cleared_open_fro: filteredClearSelect,
  "1": mockIssues1,
  "2": mockIssues2,
  "3": mockIssues3,
};

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    cy.intercept(
      "GET",
      /https:\/\/prolog-api\.profy\.dev\/issue\?page=(\d+)/,
      (req) => {
        const url = new URL(req.url);
        const page = url.searchParams.get("page");
        const level = url.searchParams.get("level") || "cleared";
        const status = url.searchParams.get("status");
        const project = url.searchParams.get("project");

        // Generate the key for the fixture map
        const key = [level, status, project].filter(Boolean).join("_");
        const fixture =
          fixtureMap[key as keyof typeof fixtureMap] ||
          fixtureMap[page as keyof typeof fixtureMap];

        console.log("Request parameters:", { page, level, status, project });
        console.log("Generated key:", key);
        console.log("Fixture map:", fixtureMap);

        if (fixture) {
          req.reply({ body: fixture });
        }
      },
    ).as("getIssues");

    // wait for intercepts to be set up
    cy.wait(0);

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssues"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.wait("@getIssues");
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.wait("@getIssues");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.wait("@getIssues");
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    it("filtering is working", () => {
      // simulate user actions that trigger the filters testing level filter
      cy.get('[data-testid="level-select"]').click();
      cy.get(
        '[data-testid="level-select"] [data-testid="select-option-2"]',
      ).click();
      cy.wait("@getIssues");
      // Check that no pagination is displayed
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredWarning.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
      cy.url().should("include", "issues?level=warning");

      // simulate filtering to unresolved
      cy.get('[data-testid="status-select"]').click();
      cy.get(
        '[data-testid="status-select"] [data-testid="select-option-1"]',
      ).click();
      cy.wait("@getIssues");
      // Check that no pagination is displayed
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredUnresolved.items[index];
          if (issue) {
            const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
            console.log(firstLineOfStackTrace);
            cy.wrap($el).contains(issue.name);
            cy.wrap($el).contains(issue.message);
            cy.wrap($el).contains(issue.numEvents);
            cy.wrap($el).contains(issue.numUsers);
            cy.wrap($el).contains(firstLineOfStackTrace);
          }
        });
      cy.url().should("include", "issues?level=warning&status=unresolved");

      // simulate filtering to project id
      cy.get('[data-testid="search-input"]')
        .clear()
        .type("fro", { delay: 700 });
      cy.wait("@getIssues");
      // Check that no pagination is displayed
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredSearch.items[index];
          if (issue) {
            const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
            cy.wrap($el).contains(issue.name);
            cy.wrap($el).contains(issue.message);
            cy.wrap($el).contains(issue.numEvents);
            cy.wrap($el).contains(issue.numUsers);
            cy.wrap($el).contains(firstLineOfStackTrace);
          }
        });
      cy.url().should(
        "include",
        "issues?level=warning&status=unresolved&project=fro",
      );

      //test page reload
      cy.reload();
      cy.url().should(
        "include",
        "issues?level=warning&status=unresolved&project=fro",
      );

      //dropdowns empty to remove a filter
      cy.get('[data-testid="level-select"]').click();
      cy.get(
        '[data-testid="level-select"] [data-testid="select-option-0"]',
      ).click();
      cy.wait("@getIssues");
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = filteredClearSelect.items[index];
          if (issue) {
            const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
            cy.wrap($el).contains(issue.name);
            cy.wrap($el).contains(issue.message);
            cy.wrap($el).contains(issue.numEvents);
            cy.wrap($el).contains(issue.numUsers);
            cy.wrap($el).contains(firstLineOfStackTrace);
          }
        });
      cy.url().should("include", "issues?level=&status=unresolved&project=fro");
    });
  });
});
