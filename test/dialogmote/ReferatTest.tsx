import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Referat from "../../src/components/dialogmote/referat/Referat";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import {
  DialogmoteDTO,
  DialogmoteStatus,
} from "../../src/data/dialogmote/types/dialogmoteTypes";
import { Feilmelding, Innholdstittel } from "nav-frontend-typografi";
import { expect } from "chai";
import { Feiloppsummering } from "nav-frontend-skjema";
import { texts as skjemaFeilOppsummeringTexts } from "../../src/components/SkjemaFeiloppsummering";
import { texts as valideringsTexts } from "../../src/utils/valideringUtils";
import { assertFeilmelding, changeFieldValue } from "../testUtils";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const arbeidstakerPersonIdent = "05087321470";
const arbeidstakerNavn = "Arne Arbeidstaker";
const veilederNavn = "Vetle Veileder";
const moteUuid = "123abc";
const lederNavn = "Grønn Bamse";
const mote: DialogmoteDTO = {
  arbeidsgiver: {
    virksomhetsnummer: "912345678",
    type: "ARBEIDSGIVER",
    varselList: [],
    lederNavn: lederNavn,
  },
  arbeidstaker: {
    personIdent: arbeidstakerPersonIdent,
    type: "ARBEIDSTAKER",
    varselList: [],
  },
  createdAt: "",
  opprettetAv: "",
  status: DialogmoteStatus.INNKALT,
  tildeltEnhet: "",
  tildeltVeilederIdent: "",
  updatedAt: "",
  uuid: moteUuid,
  tid: "2021-05-10T09:00:00.000",
  sted: "Videomøte",
};

const mockState = {
  veilederinfo: {
    data: {
      navn: veilederNavn,
    },
  },
  navbruker: {
    data: {
      navn: arbeidstakerNavn,
      kontaktinfo: {
        fnr: arbeidstakerPersonIdent,
      },
    },
  },
  valgtbruker: {
    personident: arbeidstakerPersonIdent,
  },
};

describe("ReferatTest", () => {
  it("viser arbeidstaker, dato og sted i tittel", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/dialogmote/${moteUuid}/referat`]}
      >
        <Route path="/sykefravaer/dialogmote/:dialogmoteUuid/referat">
          <Provider store={store({ ...realState, ...mockState })}>
            <Referat dialogmote={mote} pageTitle="Test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    expect(wrapper.find(Innholdstittel).text()).to.equal(
      `${arbeidstakerNavn}, 10. mai 2021, Videomøte`
    );
  });

  it("viser alle deltakere forhåndsutfylt med nærmeste leder redigerbar og påkrevd", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/dialogmote/${moteUuid}/referat`]}
      >
        <Route path="/sykefravaer/dialogmote/:dialogmoteUuid/referat">
          <Provider store={store({ ...realState, ...mockState })}>
            <Referat dialogmote={mote} pageTitle="Test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    expect(
      wrapper
        .find("li")
        .findWhere((li) => li.text() === `Fra NAV: ${veilederNavn}`)
    ).to.exist;
    expect(
      wrapper
        .find("li")
        .findWhere((li) => li.text() === `Arbeidstaker: ${arbeidstakerNavn}`)
    ).to.exist;

    const getNaermesteLederInput = () =>
      wrapper
        .find("input")
        .findWhere((input) => input.prop("name") === "naermesteLeder");

    // Sjekk nærmeste leder preutfylt
    let naermesteLederInput = getNaermesteLederInput();
    expect(naermesteLederInput.prop("value")).to.equal(lederNavn);

    // Sjekk at nærmeste leder valideres
    changeFieldValue(naermesteLederInput, "");
    wrapper.find("form").simulate("submit");
    assertFeilmelding(
      wrapper.find(Feilmelding),
      valideringsTexts.naermesteLederMissing
    );

    // Sjekk at nærmeste leder kan endres
    const endretNaermesteLeder = "Ny Leder";
    changeFieldValue(naermesteLederInput, endretNaermesteLeder);
    naermesteLederInput = getNaermesteLederInput();
    expect(naermesteLederInput.prop("value")).to.equal(endretNaermesteLeder);
  });

  it("validerer alle fritekstfelter unntatt veileders oppgave", () => {
    const wrapper = mount(
      <MemoryRouter
        initialEntries={[`/sykefravaer/dialogmote/${moteUuid}/referat`]}
      >
        <Route path="/sykefravaer/dialogmote/:dialogmoteUuid/referat">
          <Provider store={store({ ...realState, ...mockState })}>
            <Referat dialogmote={mote} pageTitle="Test" />
          </Provider>
        </Route>
      </MemoryRouter>
    );

    wrapper.find("form").simulate("submit");

    // Feilmeldinger i skjema
    const feil = wrapper.find(Feilmelding);
    assertFeilmelding(feil, valideringsTexts.situasjonMissing);
    assertFeilmelding(feil, valideringsTexts.konklusjonMissing);
    assertFeilmelding(feil, valideringsTexts.arbeidstakersOppgaveMissing);
    assertFeilmelding(feil, valideringsTexts.arbeidsgiversOppgaveMissing);

    // Feilmelding i oppsummering
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.situasjonMissing
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.konklusjonMissing
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.arbeidstakersOppgaveMissing
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.arbeidsgiversOppgaveMissing
    );
  });
});
