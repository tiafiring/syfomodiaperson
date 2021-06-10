import { MoteState } from "../../support/motelandingsside-commands";

const texts = {
  situasjon: "Min situasjon",
  konklusjon: "Konkluderer",
  arbeidstakersOppgave: "Jobbe",
  arbeidsgiversOppgave: "Tekst",
};

context("Ferdigstill dialogmøte", () => {
  beforeEach(() => {
    cy.stubMoter(MoteState.INNKALT_DIALOGMOTE);
    cy.visit("/sykefravaer/moteoversikt");
  });

  it("Går til skriv referat og avbryter", () => {
    cy.contains("Skriv referat").click();

    cy.contains("Avbryt").click();
    cy.get(".sidetopp__tittel").contains("Dialogmøter");
  });

  it("Går til skriv referat, sjekker valideringsfeil, skriver referat og sender inn", () => {
    cy.contains("Skriv referat").click();

    cy.contains("Lagre og send").click();

    cy.contains("For å gå videre må du rette opp følgende:");

    cy.dataCy("situasjonTextArea").type(texts.situasjon);
    cy.dataCy("konklusjonTextArea").type(texts.konklusjon);
    cy.dataCy("arbeidstakersOppgaveTextArea").type(texts.arbeidstakersOppgave);
    cy.dataCy("arbeidsgiversOppgaveTextArea").type(texts.arbeidsgiversOppgave);

    cy.contains("Lagre og send").click();

    cy.url().should("include", "/sykefravaer/moteoversikt");
  });
});
