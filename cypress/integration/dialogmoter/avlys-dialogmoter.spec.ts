import { MoteState } from "../../support/motelandingsside-commands";

const texts = {
  begrunnelseArbeidstaker: "Ørsta rådhus",
  begrunnelseArbeidsgiver: "Pina d grett",
};

context("Avlys dialogmøte", () => {
  beforeEach(() => {
    cy.stubMoter(MoteState.INNKALT_DIALOGMOTE);
    cy.visit("/sykefravaer/moteoversikt");
  });

  it("Tester feilhåndtering for manglende begrunnelse", () => {
    cy.dataCy("avlysMoteKnapp").click();

    cy.dataCy("begrunnelseArbeidstakerTextArea")
      .should("have.attr", "aria-invalid")
      .and("equal", "false");

    cy.dataCy("begrunnelseArbeidsgiverTextArea")
      .should("have.attr", "aria-invalid")
      .and("equal", "false");

    cy.dataCy("sendAvlysningKnapp").click();

    cy.dataCy("begrunnelseArbeidstakerTextArea")
      .should("have.attr", "aria-invalid")
      .and("equal", "true");

    cy.dataCy("begrunnelseArbeidsgiverTextArea")
      .should("have.attr", "aria-invalid")
      .and("equal", "true");
  });

  it("Går til avlys dialogmøte, sjekker forhåndsvisning og avbryter", () => {
    cy.dataCy("avlysMoteKnapp").click();

    cy.dataCy("begrunnelseArbeidstakerTextArea").type(
      texts.begrunnelseArbeidstaker
    );
    cy.dataCy("begrunnelseArbeidstakerKnapp").click();
    cy.dataCy("ForhåndsvisningModal").contains(texts.begrunnelseArbeidstaker);
    cy.contains("Lukk").click();

    cy.dataCy("begrunnelseArbeidsgiverTextArea").type(
      texts.begrunnelseArbeidsgiver
    );
    cy.dataCy("begrunnelseArbeidsgiverKnapp").click();
    cy.dataCy("ForhåndsvisningModal").contains(texts.begrunnelseArbeidsgiver);
    cy.contains("Lukk").click();

    cy.contains("Avbryt").click();
    cy.get(".sidetopp__tittel").contains("Dialogmøter");
  });

  it("Avlyser møte", () => {
    cy.dataCy("avlysMoteKnapp").click();

    cy.dataCy("begrunnelseArbeidstakerTextArea").type(
      texts.begrunnelseArbeidstaker
    );

    cy.dataCy("begrunnelseArbeidsgiverTextArea").type(
      texts.begrunnelseArbeidsgiver
    );

    cy.contains("Send").click();

    cy.url().should("include", "/sykefravaer/moteoversikt");
  });
});
