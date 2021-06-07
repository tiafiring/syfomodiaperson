import { MoteState } from "../../support/motelandingsside-commands";

context("Møtelandingsside actions", () => {
  beforeEach(() => {
    cy.visit("/sykefravaer/moteoversikt");
  });

  it("Oppretter nytt møte der behandler skal være med", () => {
    cy.stubMoter(MoteState.INGEN_MOTER);

    cy.contains("Nytt dialogmøte").click();

    cy.get("button").contains("Ja").click();

    cy.url().should("include", "/sykefravaer/mote");
  });

  it("Ønsker å prøve ny løsning for Dialogmøte", () => {
    cy.stubMoter(MoteState.INGEN_MOTER);

    cy.contains("Nytt dialogmøte").click();

    cy.get("button").contains("Nei").click();

    cy.get("button").contains("Ja").click();

    cy.url().should("include", "/sykefravaer/dialogmote");
  });
});
