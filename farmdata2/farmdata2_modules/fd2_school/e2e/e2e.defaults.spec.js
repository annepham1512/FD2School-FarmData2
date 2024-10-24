describe("Test the harvest report default values", () => {
  beforeEach(() => {
    cy.login("manager1", "farmdata2");
    cy.visit("/farm/fd2-school/e2e");
  });

  it("Check the page header", () => {
    cy.get("[data-cy=page-header]").should("have.text", "Harvest Report");
  });

  it("Check start and end date", () => {
    cy.get("[data-cy=start-date]").should("exist");
    cy.get("[data-cy=start-date]").should("have.value", "2020-05-05");
    cy.get("[data-cy=end-date]").should("have.value", "2020-05-15");
  });

  it("Check crop dropdown values", () => {
    // Check the first crop name
    cy.get("[data-cy=crop-dropdown]")
      .children()
      .eq(1)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("ARUGULA");
      });

    // Check the fifth crop name
    cy.get("[data-cy=crop-dropdown")
      .children()
      .eq(5)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("BEAN-FAVA");
      });

    // Check the last crop name
    cy.get("[data-cy=crop-dropdown")
      .children()
      .last()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("ZUCCHINI");
      });

    // Check the number of crops, it is 112 because we also have "All crops"
    cy.get("[data-cy=crop-dropdown").children().should("have.length", 112);
  });

  it("Check generate button clickable", () => {
    cy.get("[data-cy=generate-report-button]").click();
  });

  it("Check if display the report header after generating the report", () => {
    //Step 1: Before generating the report, ensure the report header does not exist
    cy.get("[data-cy=report-header]").should("not.exist");

    // Step 2: Click the Generate Report button
    cy.get("[data-cy=generate-report-button").click();

    // Step 3: After generating the report, ensure that the rpeort header is visible
    cy.get("[data-cy=report-header").should("be.visible");
  });

  it("Check if display the correct farm name when the report is generated", () => {
    // Click the Generate Report button
    cy.get("[data-cy=generate-report-button").click();

    // Check if the farm name is correctly displayed
    cy.get("[data-cy=farm-name]", { timeout: 20000 }).should(
      "have.text",
      "Sample Farm"
    );
  });

  it("Check if display the correct language when the report is generated", () => {
    // Step 1: Click the Generate Report button
    cy.get("[data-cy=generate-report-button]").click();

    // Step 2: Check that the language is correctly displayed
    cy.get("[data-cy=language]").should("have.text", "English");
  });
});
