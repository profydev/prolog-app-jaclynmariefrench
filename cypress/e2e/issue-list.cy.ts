import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";
import filteredWarning from "../fixtures/issues-page-filter-warning.json";
import filteredUnresolved from "../fixtures/issues-page-filter-unresolved.json";

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
        const level = url.searchParams.get("level");
        const status = url.searchParams.get("status");

        if (level === "warning" && status === "open") {
          req.reply({ fixture: "issues-page-filter-unresolved.json" });
        } else if (level === "warning") {
          req.reply({ fixture: "issues-page-filter-warning.json" });
        } else if (status === "unresolved") {
          req.reply({ fixture: "issues-page-filter-unresolved.json" });
        } else if (page === "1") {
          req.reply({ fixture: "issues-page-1.json" });
        } else if (page === "2") {
          req.reply({ fixture: "issues-page-2.json" });
        } else if (page === "3") {
          req.reply({ fixture: "issues-page-3.json" });
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
      // simulate filtering to project id
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
    });
  });
});

// import mockIssues1 from "../fixtures/issues-page-1.json";
// import mockIssues2 from "../fixtures/issues-page-2.json";
// import mockIssues3 from "../fixtures/issues-page-3.json";
// // import filterMockWarning from "../fixtures/issues-page-filter-warning.json";
// // import filterMockUnresolved from "../fixtures/issues-page-filter-unresolved.json";
// // import filterMockProjectSearch from "../fixtures/issues-page-filter-project-search.json";

// describe("Issue List", () => {
//   beforeEach(() => {
//     // setup request mocks
//     cy.intercept("GET", "https://prolog-api.profy.dev/project", {
//       fixture: "projects.json",
//     }).as("getProjects");
//     cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
//       fixture: "issues-page-1.json",
//     }).as("getIssuesPage1");
//     cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2*", {
//       fixture: "issues-page-2.json",
//     }).as("getIssuesPage2");
//     cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3*", {
//       fixture: "issues-page-3.json",
//     }).as("getIssuesPage3");

//     // wait for intercepts to be set up
//     cy.wait(0);

//     // open issues page
//     cy.visit(`http://localhost:3000/dashboard/issues`);

//     // wait for request to resolve
//     cy.wait(["@getProjects", "@getIssuesPage1"]);
//     cy.wait(500);

//     // set button aliases
//     cy.get("button").contains("Previous").as("prev-button");
//     cy.get("button").contains("Next").as("next-button");
//   });

//   context("desktop resolution", () => {
//     beforeEach(() => {
//       cy.viewport(1025, 900);
//     });

//     it("renders the issues", () => {
//       cy.get("main")
//         .find("tbody")
//         .find("tr")
//         .each(($el, index) => {
//           const issue = mockIssues1.items[index];
//           const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
//           cy.wrap($el).contains(issue.name);
//           cy.wrap($el).contains(issue.message);
//           cy.wrap($el).contains(issue.numEvents);
//           cy.wrap($el).contains(issue.numUsers);
//           cy.wrap($el).contains(firstLineOfStackTrace);
//         });
//     });

//     it("paginates the data", () => {
//       // test first page
//       cy.contains("Page 1 of 3");
//       cy.get("@prev-button").should("have.attr", "disabled");

//       // test navigation to second page
//       cy.get("@next-button").click();
//       cy.wait("@getIssuesPage2");
//       cy.get("@prev-button").should("not.have.attr", "disabled");
//       cy.contains("Page 2 of 3");
//       cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

//       // test navigation to third and last page
//       cy.get("@next-button").click();
//       cy.wait("@getIssuesPage3");
//       cy.get("@next-button").should("have.attr", "disabled");
//       cy.contains("Page 3 of 3");
//       cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

//       // test navigation back to second page
//       cy.get("@prev-button").click();
//       cy.wait("@getIssuesPage2");
//       cy.get("@next-button").should("not.have.attr", "disabled");
//       cy.contains("Page 2 of 3");
//       cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
//     });

//     it("filtering is working", () => {
//       cy.intercept("GET", "https://prolog-api.profy.dev/issue?level=warning*", {
//         fixture: "issues-page-filter-warning.json",
//       }).as("getIssueFilterWarning");
//       // cy.intercept(
//       //   "GET",
//       //   "https://prolog-api.profy.dev/issue?status=unresolved*",
//       //   {
//       //     fixture: "issue-page-filter-unresolved.json",
//       //   },
//       // ).as("getIssueFilterUnresolved");
//       // cy.intercept(
//       //   "GET",
//       //   "https://prolog-api.profy.dev/issue?status=unresolved&project=front*",
//       //   {
//       //     fixture: "issue-page-filter-project-search.json",
//       //   },
//       // ).as("getIssueFilterSearch");

//       // simulate user actions that trigger the filters
//       cy.get('[data-testid="level-select"]').click();
//       cy.get(
//         '[data-testid="level-select"] [data-testid="select-option-2"]',
//       ).click();
//       // cy.wait("@getIssueFilterWarning");

//       // Check that no pagination is displayed
//       // cy.get("@prev-button").should("not.exist");
//       // cy.get("@next-button").should("not.exist");

//       // Check that no pagination is displayed
//       // cy.get("@prev-button").should("not.exist");
//       // cy.get("@next-button").should("not.exist");
//       // cy.get('[data-testid="level-select"]').click();
//       // Wait for the options to be visible
//       // cy.wait(1000); // Adjust the wait time as needed

//       // cy.get('[data-testid="status-select"] [data-testid="select-option-0"]')
//       //   .should("be.visible")
//       //   .then(($option) => {
//       //     cy.log("Found the option", $option);
//       //   })
//       //   .click();
//     });
//   });
// });

// // Allows filtering for “Unresolved” and “Resolved” issues
// // Allows filtering for level “Error”, “Warning”, and “Info”
// // Allows filtering for any existing project by (partial) project name
// // Every dropdown can be empty (no value selected) to remove a filter
// // Issues are displayed according to the filters
// // Each filter should persist after the page is refreshed
// // The user should be able to share the page including the currently selected filters
