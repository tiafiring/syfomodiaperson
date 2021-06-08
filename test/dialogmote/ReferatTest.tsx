import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import Referat from "../../src/components/dialogmote/referat/Referat";
import { createStore } from "redux";
import { rootReducer } from "../../src/data/rootState";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import {
  DialogmoteDTO,
  DialogmoteStatus,
} from "../../src/data/dialogmote/types/dialogmoteTypes";
import { Feilmelding, Innholdstittel } from "nav-frontend-typografi";
import { expect } from "chai";
import { Checkbox, Feiloppsummering } from "nav-frontend-skjema";
import { texts as skjemaFeilOppsummeringTexts } from "../../src/components/SkjemaFeiloppsummering";
import { texts as valideringsTexts } from "../../src/utils/valideringUtils";

const realState = createStore(rootReducer).getState();
const store = configureStore([]);
const arbeidstakerPersonIdent = "05087321470";
const arbeidstakerNavn = "Arne Arbeidstaker";
const veilederNavn = "Vetle Veileder";
const moteUuid = "123abc";
const mote: DialogmoteDTO = {
  arbeidsgiver: {
    virksomhetsnummer: "912345678",
    type: "ARBEIDSGIVER",
    varselList: [],
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

  it("viser alle deltakere forhåndsvalgt og mulig å velge bort", () => {
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

    const checkboxes = wrapper.find(Checkbox);
    const arbeidstakerCheckbox = checkboxes.at(0);
    const arbeidsgiverCheckbox = checkboxes.at(1);
    const veilederCheckbox = checkboxes.at(2);

    expect(arbeidstakerCheckbox.props().checked).to.be.true;
    expect(arbeidsgiverCheckbox.props().checked).to.be.true;
    expect(veilederCheckbox.props().checked).to.be.true;

    expect(arbeidstakerCheckbox.props().disabled).to.be.undefined;
    expect(arbeidsgiverCheckbox.props().disabled).to.be.undefined;
    expect(veilederCheckbox.props().disabled).to.be.undefined;
  });

  it("validerer at arbeidstaker må være deltaker", () => {
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

    // Fjern avhuking på arbeidstaker og submit
    const arbeidstakerCheckbox = wrapper.find(Checkbox).first();
    arbeidstakerCheckbox
      .find("input")
      .simulate("change", { target: { checked: false } });
    wrapper.find("form").simulate("submit");

    // Sjekk at feilmelding finnes i skjema og oppsummering
    assertFeilmelding(
      wrapper.find(Feilmelding),
      valideringsTexts.deltakerArbeidstakerMissing
    );
    const feiloppsummering = wrapper.find(Feiloppsummering);
    expect(feiloppsummering.text()).to.contain(
      skjemaFeilOppsummeringTexts.title
    );
    expect(feiloppsummering.text()).to.contain(
      valideringsTexts.deltakerArbeidstakerMissing
    );
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

const assertFeilmelding = (
  feilmeldinger: ReactWrapper<any, any>,
  msg: string
) => expect(feilmeldinger.someWhere((feil) => feil.text() === msg)).to.be.true;
